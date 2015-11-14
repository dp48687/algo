'use strict';

const bufferStdin = require('../lib/buffer-stdin');
const parseMatrix = require('../lib/parse-matrix');

class Node {
  constructor() {
    this.explored = false;
    this.edges = [];
    this.leader = null;
    this.finishingTime = null;
  }
}

function dfsLoop(nodes) {
  // The first element of nodes is empty to make it one-indexed.
  const n = nodes.length - 1;

  // # of processed nodes so far.
  let t = 0;
  // Current source vertex.
  let s = null;

  // TODO: Should be properties of nodes?
  const finishingTimes = new Array(n + 1);
  const leaders = new Array(n + 1);

  for (let i = n; i >= 1; i--) {
    if (!nodes[i].explored) {
      s = i;
      dfs(i);
    }
  }

  function dfs(i) {
    nodes[i].explored = true;
    nodes[i].leader = s;
    for (let j of nodes[i].edges) {
      if (!nodes[j].explored) {
        dfs(j);
      }
    }
    t++;
    nodes[i].finishingTime = t;
  }

  return nodes;
}

function countSCCs(nodes) {
  const sccs = new Array(nodes.length);
  for (let node of nodes) {
    if (!node) {
      continue;
    }
    sccs[node.leader] = (sccs[node.leader] || 0) + 1;
  }

  return fixSize(5, sccs.filter(Boolean).sort((a, b) => b - a));
}

// Crop if too many. Fill with 0 if too few.
function fixSize(size, arr) {
  const fixed = arr.slice(0, size);
  while (fixed.length < size) {
    fixed.push(0);
  }
  return fixed;
}

function buildNodes(edges, reversed) {
  const nodes = [];
  for (let edge of edges) {
    const i = edge[0];
    const j = edge[1];
    if (!nodes[i]) {
      nodes[i] = new Node();
    }
    if (!nodes[j]) {
      nodes[j] = new Node();
    }

    if (reversed) {
      nodes[j].edges.push(i);
    } else {
      nodes[i].edges.push(j);
    }
  }
  return nodes;
}

// Convert graph indices to reverted graph's finish times.
function indexWithFinishingTime(graph, graphRev) {
  const result = [];
  for (let i = 1; i < graph.length; i++) {
    const node = graph[i];
    // Convert position in array.
    result[graphRev[i].finishingTime] = node;
    // Convert edges.
    for (let j = 0; j < node.edges.length; j++) {
      node.edges[j] = graphRev[node.edges[j]].finishingTime;
    }
  }
  return result;
}

function printGraph(nodes) {
  for (let i = 1; i < nodes.length; i++) {
    const node = nodes[i];
    console.error(i, node.edges);
  }
}

function findSCCs(edges) {
  const graph = buildNodes(edges, false);
  const graphRev = buildNodes(edges, true);

  dfsLoop(graphRev);

  const graphMagic = indexWithFinishingTime(graph, graphRev);

  dfsLoop(graphMagic);

  const counts = countSCCs(graphMagic);
  return counts.join(',');
}

module.exports = findSCCs;

if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const edges = parseMatrix(input);
    const counts = findSCCs(edges);
    console.log(counts);
  });
}

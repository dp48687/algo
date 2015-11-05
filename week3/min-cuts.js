'use strict';

const bufferStdin = require('../lib/buffer-stdin');

class Vertex {
  constructor(nums) {
    this.nums = nums;
  }
}

class Edge {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

// TODO: Optimize.
function findMinCuts(vertices, edges) {
  while (vertices.length > 2) {
    // Pick a random edge.
    const random = Math.floor(Math.random() * edges.length);
    const edge = edges[random];
    deleteFrom(edges, edge);
    // Add a new merged vertice.
    const merged = merge(edge.from, edge.to);
    vertices.push(merged);

    // Delete original vertices.
    deleteFrom(vertices, edge.from);
    deleteFrom(vertices, edge.to);

    // Delete self-loops.
    const edgesToDelete = edges.filter((e) => {
      return (edge.from === e.from && edge.to === e.to) ||
        (edge.from === e.to && edge.to === e.from);
    });
    edgesToDelete.forEach((e) => {
      deleteFrom(edges, e);
    });

    // Update the edges that have the vertices to be merged.
    edges.forEach((e, i) => {
      if (e.from === edge.from || e.from === edge.to) {
        edges[i] = new Edge(merged, e.to);
      }
      if (e.to === edge.from || e.to === edge.to) {
        edges[i] = new Edge(e.from, merged);
      }
    });
  }
  return edges.length;
}

function merge(from, to) {
  if (from === to) {
    throw new Error(`Cannot merge the same vertex [${from.nums}] [${to.nums}]`);
  }
  const nums = [].concat(from.nums, to.nums).sort((a, b) => a - b);
  return new Vertex(nums);
}

function deleteFrom(arr, item) {
  const index = arr.indexOf(item);
  if (index < 0) {
    const array = arr.map((a) => `[${a.nums}]`).join(', ');
    if (item == null) {
      throw new Error('item is null!');
    }
    throw new Error(`Could not find [${item.nums}] in ${array}`);
  }
  arr.splice(index, 1);
}

module.exports = findMinCuts;

if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const lines = input.split('\n')
      .filter((line) => line.length > 0)
      .map((line) => line.split(/\s/).map((n) => parseInt(n, 10)));

    const vertices = [];
    for (let i = 1; i <= lines.length; i++) {
      vertices.push(new Vertex([i]));
    }
    const edges = [];

    lines.forEach((line) => {
      const u = vertices[line[0] - 1];
      const rests = line.slice(1);
      rests.forEach((rest) => {
        if (line[0] < rest) {
          const v = vertices[rest - 1];
          edges.push(new Edge(u, v));
        }
      });
    });

    let min = Number.MAX_VALUE;
    // TODO: Run more?
    const tries = vertices.length;
    for (let i = 0; i < tries; i++) {
      const cuts = findMinCuts(vertices.slice(), edges.slice());
      if (cuts < min) {
        min = cuts;
      }
    }
    console.log(min);
  });
}

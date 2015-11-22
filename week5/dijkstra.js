'use strict';

const bufferStdin = require('../lib/buffer-stdin');

class Edge {
  constructor(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = distance;
  }
}

class Vertex {
  constructor(index) {
    this.index = index;

    this.shortestDistance = null;
    this.shortestPath = null;
    this.edges = [];
  }
}

// TODO: Use heap!
// OPTIONAL: For those of you seeking an additional challenge, try implementing
// the heap-based version. Note this requires a heap that supports deletions,
// and you'll probably need to maintain some kind of mapping between vertices
// and their positions in the heap.
function findShortestPaths(sourceIndex, vertices) {
  // If vertices is one-indexed, exclude it from the count.
  const vertexCount = vertices.filter(Boolean).length;

  const source = vertices[sourceIndex];
  source.shortestDistance = 0;
  source.shortestPath = [];

  const X = [source];

  // O(mn)
  while (X.length < vertexCount) {
    let minDistance = Number.POSITIVE_INFINITY;
    let minEdge = null;

    for (let v of X) {
      for (let edge of v.edges) {
        if (edge.to.shortestDistance === null) {
          const distance = v.shortestDistance + edge.distance;
          if (distance < minDistance) {
            minDistance = distance;
            minEdge = edge;
          }
        }
      }
    }

    const v = minEdge.from;
    const w = minEdge.to;
    w.shortestDistance = minDistance;
    w.shortestPath = v.shortestPath.concat(w.index);
    X.push(w);
  }
}

module.exports = findShortestPaths;

if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const vertices = [];

    const lines = input.split('\n');
    for (let line of lines) {
      const components = line.split(/\s+/);
      const index = parseInt(components[0], 10);
      if (vertices[index] === undefined) {
        vertices[index] = new Vertex(index);
      }
      const pairs = components.filter(Boolean).slice(1).map((component) => {
        return component.split(',').map((s) => parseInt(s, 10));
      });
      for (let pair of pairs) {
        const toIndex = pair[0];
        const distance = pair[1];
        if (vertices[toIndex] === undefined) {
          vertices[toIndex] = new Vertex(toIndex);
        }
        const edge = new Edge(vertices[index], vertices[toIndex], distance);
        vertices[index].edges.push(edge);
      }
    }

    findShortestPaths(1, vertices);

    const destinations = [7,37,59,82,99,115,133,165,188,197];
    const distances = destinations.map((destination) => {
      const vertex = vertices[destination];
      if (vertex.shortestDistance === null) {
        return 1000000;
      } else {
        return vertex.shortestDistance;
      }
    });
    console.log(distances.join(','));
  });
}

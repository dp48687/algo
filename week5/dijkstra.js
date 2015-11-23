'use strict';

const bufferStdin = require('../lib/buffer-stdin');
const Heap = require('./heap');

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
    this.heapIndex = null;

    this.shortestDistance = null;
    this.shortestPath = null;
    this.edges = [];
  }
}

// Runs Dijkstra's shortest path algorithm with a heap of vertices with keys of
// shortest distances from the source vertex. Updates vertices' `shortestDistance`
// and `shortestPath` as a result.
function findShortestPaths(sourceIndex, vertices) {
  // If vertices is one-indexed, exclude it from the count.
  const vertexCount = vertices.filter(Boolean).length;

  // Keep (V - X) vertices that are reachable from X vertices at the time.
  const heap = new Heap((vertex) => vertex.shortestDistance);

  const source = vertices[sourceIndex];
  source.shortestDistance = 0;
  source.shortestPath = [];
  updateHeap(source);

  let X = 1;

  // O(mn)
  while (X < vertexCount) {
    const w = heap.deleteMin();
    X++;
    updateHeap(w);
  }

  // Update vertices that have edges from the given vertex.
  // Each vertex's heap key, shortest distance, is updated only when
  // a vertex with an edge to it is added.
  function updateHeap(v) {
    for (let edge of v.edges) {
      const distance = v.shortestDistance + edge.distance;
      const w = edge.to;
      if (w.shortestDistance === null) {
        // w has never been in the heap.
        w.shortestDistance = distance;
        w.shortestPath = v.shortestPath.concat(w);
        heap.insert(w);
      } else {
        if (w.heapIndex === null) {
          // w is already in X.
          continue;
        }
        // Update w's key only if it gets shorter distance than it has.
        if (distance < w.shortestDistance) {
          heap.deleteAt(w.heapIndex);
          w.shortestDistance = distance;
          w.shortestPath = v.shortestPath.concat(w);
          heap.insert(w);
        }
      }
    }
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

    // Parse the input and create vertices that have edges from them.
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

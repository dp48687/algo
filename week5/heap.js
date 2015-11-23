'use strict';

// A min heap that keeps track of index in the array of each node.
// Each node's heap index is set as its `heapIndex` property.
class Heap {
  constructor(keyFunc) {
    this.keyFunc = keyFunc;
    this.nodes = [];
  }

  insert(node) {
    this.nodes.push(node);
    node.heapIndex = this.nodes.length - 1;

    if (this.nodes.length > 1) {
      this._bubbleUp();
    }
  }

  deleteMin() {
    if (this.isEmpty()) {
      throw new Error('Empty heap');
    }

    const min = this.nodes[0];

    if (this.nodes.length === 1) {
      this.nodes.length = 0;
    } else {
      this.nodes[0] = this.nodes.pop();
      this.nodes[0].heapIndex = 0;
      this._bubbleDown(0);
    }

    min.heapIndex = null;
    return min;
  }

  deleteAt(index) {
    if (index >= this.nodes.length) {
      throw new ArgumentError(`Out of range ${index}/${this.nodes.length}`);
    }

    if (index === 0) {
      return this.deleteMin();
    } else if (index === this.nodes.length - 1) {
      const node = this.nodes.pop();
      node.heapIndex = null;
      return node;
    } else {
      const node = this.nodes[index];
      node.heapIndex = null;
      this.nodes[index] = this.nodes.pop();
      this.nodes[index].heapIndex = index;
      this._bubbleDown(index);
      return node;
    }
  }

  size() {
    return this.nodes.length;
  }

  isEmpty() {
    return this.nodes.length === 0;
  }

  _getKey(node) {
    return this.keyFunc(node);
  }

  // Bubble up the bottom right node until the heap property is restored.
  _bubbleUp() {
    let index = this.nodes.length - 1;
    while (index > 0) {
      const node = this.nodes[index];
      const nodeKey = this._getKey(node);
      const parentIndex = Math.floor((index + 1) / 2 - 1);
      const parent = this.nodes[parentIndex];
      const parentKey = this._getKey(parent);

      // Break if the heap property has been restored.
      if (nodeKey >= parentKey) {
        break;
      }

      // Swap with parent.
      this.nodes[index] = parent;
      parent.heapIndex = index;
      this.nodes[parentIndex] = node;
      node.heapIndex = parentIndex;
      index = parentIndex;
    }
  }

  // Bubble down a node until the heap property is restored.
  _bubbleDown(startIndex) {
    let index = startIndex;
    while (index < this.nodes.length - 1) {
      const node = this.nodes[index];
      const nodeKey = this._getKey(node);
      // 2n and 2n+1 in the one-indexed.
      const childIndex1 = 2 * (index + 1) - 1;
      const childIndex2 = childIndex1 + 1;

      if (childIndex1 > this.nodes.length - 1) {
        // No more children.
        break;
      }

      const child1 = this.nodes[childIndex1];
      const childKey1 = this._getKey(child1);

      if (childIndex2 > this.nodes.length - 1) {
        // Only one child === the bottom level.
        if (nodeKey <= childKey1) {
          break;
        }
        // Swap with child.
        this.nodes[index] = child1;
        child1.heapIndex = index;
        this.nodes[childIndex1] = node;
        node.heapIndex = childIndex1;

        break;
      } else {
        // Compare with both.
        const child2 = this.nodes[childIndex2];
        const childKey2 = this._getKey(child2);

        if (nodeKey <= childKey1 && nodeKey <= childKey2) {
          break;
        }

        // Swap with the smaller child.
        if (childKey1 < childKey2) {
          this.nodes[index] = child1;
          child1.heapIndex = index;
          this.nodes[childIndex1] = node;
          node.heapIndex = childIndex1;

          index = childIndex1;
        } else {
          this.nodes[index] = child2;
          child2.heapIndex = index;
          this.nodes[childIndex2] = node;
          node.heapIndex = childIndex2;

          index = childIndex2;
        }
      }
    }
  }

  // TODO: O(n log n) -> O(n)
  // https://en.wikipedia.org/wiki/Binary_heap#Building_a_heap
  static heapify(keyFunc, nodes) {
    const heap = new Heap(keyFunc);
    for (let node of nodes) {
      heap.insert(node);
    }
    return heap;
  }
}

module.exports = Heap;

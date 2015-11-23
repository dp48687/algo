'use strict';

// A min heap that keeps track of index in the array of each node.
// If `keepHeapIndex` is true, each node's heap index is set as its
// `heapIndex` property.
class Heap {
  constructor(keyFunc, keepHeapIndex) {
    this.keyFunc = keyFunc;
    this.keepHeapIndex = keepHeapIndex === true;
    this.nodes = [];
  }

  insert(node) {
    this.nodes.push(node);
    if (this.keepHeapIndex) {
      node.heapIndex = this.nodes.length - 1;
    }

    if (this.nodes.length > 1) {
      this._bubbleUp();
    }
  }

  top() {
    if (this.isEmpty()) {
      throw new Error('Empty heap');
    } else {
      return this.nodes[0];
    }
  }

  deleteTop() {
    if (this.isEmpty()) {
      throw new Error('Empty heap');
    }

    const min = this.nodes[0];

    if (this.nodes.length === 1) {
      this.nodes.length = 0;
    } else {
      this.nodes[0] = this.nodes.pop();
      if (this.keepHeapIndex) {
        this.nodes[0].heapIndex = 0;
      }
      this._bubbleDown(0);
    }

    if (this.keepHeapIndex) {
      min.heapIndex = null;
    }
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
      if (this.keepHeapIndex) {
        node.heapIndex = null;
      }
      return node;
    } else {
      const node = this.nodes[index];
      this.nodes[index] = this.nodes.pop();
      if (this.keepHeapIndex) {
        node.heapIndex = null;
        this.nodes[index].heapIndex = index;
      }
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
      if (this.compare(parentKey, nodeKey)) {
        break;
      }

      // Swap with parent.
      this.nodes[index] = parent;
      this.nodes[parentIndex] = node;
      if (this.keepHeapIndex) {
        parent.heapIndex = index;
        node.heapIndex = parentIndex;
      }
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
        if (this.compare(nodeKey, childKey1)) {
          break;
        }
        // Swap with child.
        this.nodes[index] = child1;
        this.nodes[childIndex1] = node;
        if (this.keepHeapIndex) {
          child1.heapIndex = index;
          node.heapIndex = childIndex1;
        }

        break;
      } else {
        // Compare with both.
        const child2 = this.nodes[childIndex2];
        const childKey2 = this._getKey(child2);

        if (this.compare(nodeKey, childKey1) && this.compare(nodeKey, childKey2)) {
          break;
        }

        // Swap with the child that is suitable for parent.
        if (this.compare(childKey1, childKey2)) {
          this.nodes[index] = child1;
          this.nodes[childIndex1] = node;
          if (this.keepHeapIndex) {
            child1.heapIndex = index;
            node.heapIndex = childIndex1;
          }

          index = childIndex1;
        } else {
          this.nodes[index] = child2;
          this.nodes[childIndex2] = node;
          if (this.keepHeapIndex) {
            child2.heapIndex = index;
            node.heapIndex = childIndex2;
          }

          index = childIndex2;
        }
      }
    }
  }

  compare(parent, child) {
    throw new Error('Not implemented');
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

class MinHeap extends Heap {
  min() {
    return this.top();
  }

  deleteMin() {
    return this.deleteTop();
  }

  // Returns true if the keys keeps the heap property.
  compare(parentKey, childKey) {
    return parentKey <= childKey;
  }
}

class MaxHeap extends Heap {
  max() {
    return this.top();
  }

  deleteMax() {
    return this.deleteTop();
  }

  // Returns true if the keys keeps the heap property.
  compare(parentKey, childKey) {
    return parentKey >= childKey;
  }
}

module.exports = {
  MaxHeap: MaxHeap,
  MinHeap: MinHeap
};

'use strict';

class Heap {
  constructor(keyFunc) {
    this.keyFunc = keyFunc;
    this.nodes = [];
  }

  insert(node) {
    this.nodes.push(node);

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
      this._bubbleDown();
    }

    return min;
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
      this.nodes[parentIndex] = node;
      index = parentIndex;
    }
  }

  _bubbleDown() {
    let index = 0;
    // TODO: Check if no more level.
    while (index < this.nodes.length - 1) {
      const node = this.nodes[index];
      const nodeKey = this._getKey(node);
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
        this.nodes[childIndex1] = node;
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
          this.nodes[childIndex1] = node;
          index = childIndex1;
        } else {
          this.nodes[index] = child2;
          this.nodes[childIndex2] = node;
          index = childIndex2;
        }
      }
    }
  }
}

module.exports = Heap;

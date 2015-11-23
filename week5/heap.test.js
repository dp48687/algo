'use strict';

const assert = require('assert');

const MinHeap = require('./heap').MinHeap;

class Value {
  constructor(value) {
    this.value = value;
  }
}

function randomNumbers(max, size) {
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = Math.floor(Math.random() * max);
  }
  return result;
}

const heap = new MinHeap((v) => v.value, true);
assert(heap.isEmpty());
assert.equal(heap.size(), 0);

const nums = randomNumbers(10000, 100000);
const sortedNums = nums.slice().sort((a, b) => a - b);

// Assert insertion.
for (let i = 0; i < nums.length; i++) {
  heap.insert(new Value(nums[i]));
  assert(!heap.isEmpty());
  assert.equal(heap.size(), i + 1);
}

// Assert heapIndex.
for (let j = 0; j < heap.nodes.length; j++) {
  const node = heap.nodes[j];
  assert.equal(node.heapIndex, j);
}

// Assert deletion.
for (let i = 0; i < sortedNums.length; i++) {
  const node = heap.deleteMin();
  assert.equal(node.value, sortedNums[i]);
  assert.equal(node.heapIndex, null);
  assert.equal(heap.size(), sortedNums.length - (i + 1));
}
assert(heap.isEmpty());

assert.throws(() => heap.deleteMin());

console.log('OK');

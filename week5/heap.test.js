'use strict';

const assert = require('assert');

const Heap = require('./heap');

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

const heap = new Heap((v) => v.value);
assert(heap.isEmpty());
assert.equal(heap.size(), 0);

const nums = randomNumbers(10000, 100000);
const sortedNums = nums.slice().sort((a, b) => a - b);

for (let i = 0; i < nums.length; i++) {
  heap.insert(new Value(nums[i]));
  assert(!heap.isEmpty());
  assert.equal(heap.size(), i + 1);
}

for (let i = 0; i < sortedNums.length; i++) {
  assert.equal(heap.deleteMin().value, sortedNums[i]);
  assert.equal(heap.size(), sortedNums.length - (i + 1));
}
assert(heap.isEmpty());

assert.throws(() => heap.deleteMin());

console.log('OK');

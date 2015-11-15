'use strict';

const assert = require('assert');

const Heap = require('./heap');

class Value {
  constructor(value) {
    this.value = value;
  }
}

const heap = new Heap((v) => v.value);
assert(heap.isEmpty());
assert.equal(heap.size(), 0);

heap.insert(new Value(5));
assert(!heap.isEmpty());
assert.equal(heap.size(), 1);

heap.insert(new Value(4));
heap.insert(new Value(10));
heap.insert(new Value(8));
heap.insert(new Value(15));
heap.insert(new Value(3));
heap.insert(new Value(4));
heap.insert(new Value(9));
heap.insert(new Value(-3));
heap.insert(new Value(-8));
heap.insert(new Value(20));
assert.equal(heap.size(), 11);

assert.equal(heap.deleteMin().value, -8);
assert.equal(heap.deleteMin().value, -3);
assert.equal(heap.deleteMin().value, 3);
assert.equal(heap.deleteMin().value, 4);
assert.equal(heap.deleteMin().value, 4);
assert.equal(heap.deleteMin().value, 5);
assert.equal(heap.deleteMin().value, 8);
assert.equal(heap.deleteMin().value, 9);
assert.equal(heap.deleteMin().value, 10);
assert.equal(heap.deleteMin().value, 15);
assert.equal(heap.deleteMin().value, 20);
assert(heap.isEmpty());

assert.throws(() => heap.deleteMin());

console.log('OK');

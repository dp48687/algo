'use strict';

const assert = require('assert');
const sort = require('./quick-sort');

function test(original, expected) {
  for (var i = 0; i < 1000; i++) {
    const actual = original.slice();
    sort(actual);
    assert.deepEqual(actual, expected);
  }
  console.log(`ok: sort [${original}] -> [${expected}]`);
}

function randomTest(len, max) {
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = Math.floor(Math.random() * max);
  }
  const expected = arr.slice().sort((a, b) => a - b);
  test(arr, expected);
}

function testMedian(arr, expected) {
  const index = sort.chooseMedian(arr, 0, arr.length - 1);
  const actual = arr[index];
  assert.deepEqual(actual, expected);
  console.log(`ok: median [${arr}] -> ${actual}`);
}

test([], []);
test([3], [3]);
test([1, 2, 3], [1, 2, 3]);
test([3, 1, 2], [1, 2, 3]);
test([1, 2, 1, 2, 4, 3], [1, 1, 2, 2, 3, 4]);
test([10, 8, 3, 5, 4, 5, 12, 7], [3, 4, 5, 5, 7, 8, 10, 12]);

randomTest(100, 1000);

testMedian([3, 2, 4], 3);
testMedian([8, 2, 4, 5, 7, 1], 4);

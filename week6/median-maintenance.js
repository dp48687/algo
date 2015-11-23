'use strict';

const bufferStdin = require('../lib/buffer-stdin');
const heap = require('../week5/heap');
const MaxHeap = heap.MaxHeap;
const MinHeap = heap.MinHeap;

function modMedianSum(nums) {
  // Put larger numbers in minHeap smaller ones in maxHeap.
  const minHeap = new MinHeap((v) => v);
  const maxHeap = new MaxHeap((v) => v);

  let mod = 0;

  for (let num of nums) {
    if (maxHeap.isEmpty() && minHeap.isEmpty()) {
      // The first num.
      maxHeap.insert(num);
    } else {
      if (num > maxHeap.max()) {
        minHeap.insert(num);
      } else {
        maxHeap.insert(num);
      }
    }

    // Keep that max heap has 1 more than or equal to
    // the nums of min heap.
    while (maxHeap.size() - minHeap.size() >= 2) {
      minHeap.insert(maxHeap.deleteMax());
    }
    while (minHeap.size() - maxHeap.size() >= 1) {
      maxHeap.insert(minHeap.deleteMin());
    }

    // Max heap's max is always the median.
    const median = maxHeap.max();
    mod = (mod + median) % 10000;
  }

  return mod;
}


if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const lines = input.split('\n');
    const nums = lines.filter((line) => line.length > 0)
                      .map((line) => parseInt(line, 10));
    const mod = modMedianSum(nums);
    console.log(mod);
  });
}

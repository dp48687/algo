'use strict';

const bufferStdin = require('../lib/buffer-stdin');

function sort(arr, choosePivot) {
  if (typeof choosePivot !== 'function') {
    choosePivot = chooseRandom;
  }
  return partition(arr, 0, arr.length - 1, choosePivot);
}

function partition(arr, left, right, choosePivot) {
  const count = right - left + 1;
  if (count <= 1) {
    return 0;
  }
  if (count === 2) {
    if (arr[left] > arr[right]) {
      swap(arr, left, right);
    }
    return 1;
  }

  const pivot = choosePivot(arr, left, right);
  const p = arr[pivot];

  // Bring the pivot to the head.
  swap(arr, left, pivot);

  let i = left + 1; // head of > p.

  // head of unpartitioned.
  for (let j = left + 1; j <= right; j++) {
    if (arr[j] < p) {
      swap(arr, i, j);
      i++;
    }
  }

  // Place the pivot at = p partition.
  swap(arr, left, i - 1);

  // Recursively partition left and right partitions.
  const leftComparisons = partition(arr, left, i - 2, choosePivot);
  const rightComparisons = partition(arr, i, right, choosePivot);
  return (count - 1) + leftComparisons + rightComparisons;
}

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

// -- Pivot choosers

function chooseRandom(arr, left, right) {
  const count = right - left + 1;
  return left + Math.floor(Math.random() * count);
}

function chooseFirst(arr, left, right) {
  return left;
}

function chooseLast(arr, left, right) {
  return right;
}

function chooseMedian(arr, left, right) {
  const count = right - left + 1;
  const middleIndex = left + Math.ceil(count / 2) - 1;

  const first = arr[left];
  const middle = arr[middleIndex];
  const last = arr[right];

  if (first <= middle) {
    if (first <= last) {
      return middle <= last ? middleIndex : right;
    } else {
      return left;
    }
  } else {
    if (middle <= last) {
      return first <= last ? left : right;
    } else {
      return middleIndex;
    }
  }
}

module.exports = sort;
sort.chooseMedian = chooseMedian;

if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const nums = input.split('\n')
      .filter((line) => line.length > 0)
      .map((str) => parseInt(str, 10));

    // Compute the total number of comparisons for each pivot chooser.
    [chooseFirst, chooseLast, chooseMedian].forEach((choose) => {
      const comparisons = sort(nums.slice(), choose);
      console.log(comparisons);
    });
  });
}

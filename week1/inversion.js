'use strict';

const bufferStdin = require('../lib/buffer-stdin');

function inversion(arr) {
  if (arr.length <= 1) {
    return {
      count: 0,
      list: arr
    };
  }

  const len = arr.length;
  const k = Math.floor(len / 2);

  const left = inversion(arr.slice(0, k));
  const right = inversion(arr.slice(k));

  const merged = merge(left.list, right.list);

  return {
    count: left.count + right.count + merged.count,
    list: merged.list
  };
}

function merge(left, right) {
  const total = left.length + right.length;
  let i = 0;
  let j = 0;
  let count = 0;
  const merged = new Array(total);
  for (let k = 0; k < total; k++) {
    if (j >= right.length || (i < left.length && left[i] < right[j])) {
      merged[k] = left[i];
      i++;
    } else {
      merged[k] = right[j];
      j++;
      count += left.length - i;
    }
  }
  return {
    count: count,
    list: merged
  };
}

module.exports = inversion;

if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const nums = input.split('\n')
      .filter((line) => line.length > 0)
      .map((str) => parseInt(str, 10));
    console.log(inversion(nums).count);
  });
}

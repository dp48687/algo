'use strict';

const bufferStdin = require('../lib/buffer-stdin');
const HashSet = require('./hash-set');

function hasTwoSum(set, t) {
  for (let num of set) {
    const rest = t - num;
    if (rest !== num && set.has(rest)) {
      return true;
    }
  }
  return false;
}

module.exports = hasTwoSum;

if (require.main === module) {
  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    // Load factor 0.75.
    // const set = new HashSet(750019);
    const set = new HashSet(750019);

    // Put all the integers in the file.
    console.error('Loading intergers into a set...');
    const lines = input.split('\n');
    for (let line of lines) {
      if (line.length === 0) {
        continue;
      }
      const num = parseInt(line, 10);
      set.add(num);
    }

    // TODO: Make it faster...
    console.error('Counting...');
    let count = 0;
    for (let t = -10000; t <= 10000; t++) {
      if (hasTwoSum(set, t)) {
        count++;
      }
      if (t % 1000 === 0) {
        process.stderr.write('*');
      } else if (t % 100 === 0) {
        process.stderr.write('.');
      }
    }

    console.error();
    console.log(count);
  });
}

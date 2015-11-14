'use strict';

function parseMatrix(input) {
  return input.split('\n')
    .filter((line) => line.length > 0)
    .map((line) => line.split(/\s/).map((n) => parseInt(n, 10)));
}

module.exports = parseMatrix;

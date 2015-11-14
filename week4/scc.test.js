'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const parseMatrix = require('../lib/parse-matrix');
const findSCCs = require('../week4/scc.js');

const files = fs.readdirSync(__dirname);

for (let file of files) {
  const match = /^case-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)\.txt$/.exec(file);
  if (match) {
    const expected = match.slice(1, 6).join(',');
    const raw = fs.readFileSync(path.join(__dirname, file));
    const data = parseMatrix(raw.toString());
    const actual = findSCCs(data);
    assert.equal(actual, expected);
    console.log('OK', file);
  }
}

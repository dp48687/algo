'use strict';

const assert = require('assert');

const HashSet = require('./hash-set');

const set = new HashSet(1009);

// Assert insertion and existence check.
for (let i = 0; i < 10000; i += 3) {
  set.add(i);
}

for (let i = 0; i < 10000; i++) {
  if (i % 3 === 0) {
    assert(set.has(i), `The set should have ${i}`);
  } else {
    assert(!set.has(i), `The set should not have ${i}`);
  }
}

console.log('OK: Insertion');

// Assert deletion.
for (let i = 0; i < 10000; i += 6) {
  set.delete(i);
}

for (let i = 0; i < 10000; i += 3) {
  if (i % 6 === 0) {
    assert(!set.has(i), `${i} should have been deleted`);
  } else {
    assert(set.has(i), `${i} should not have been deleted`);
  }
}

console.log('OK: Deletion');

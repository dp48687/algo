'use strict';

const LinkedList = require('./linked-list');

class HashSet {
  constructor(n) {
    this.n = n;
    this.buckets = new Array(n);
  }

  has(key) {
    const hash = this.calcHash(key);
    if (this.buckets[hash] === undefined) {
      return false;
    } else {
      return this.buckets[hash].has(key);
    }
  }

  add(key) {
    const hash = this.calcHash(key);
    if (this.buckets[hash] === undefined) {
      this.buckets[hash] = new LinkedList();
    }
    const bucket = this.buckets[hash];
    if (!bucket.has(key)) {
      bucket.add(key);
    }
  }

  delete(key) {
    const hash = this.calcHash(key);
    if (this.buckets[hash] === undefined) {
      throw new Error(`Item not found ${key}`);
    } else {
      this.buckets[hash].delete(key);
    }
  }

  // TODO: Improve.
  calcHash(key) {
    return key % this.n;
  }
}

module.exports = HashSet;

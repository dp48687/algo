'use strict';

class LinkedNode {
  constructor(value) {
    this.value = value;

    this.next = null;
  }

  has(value) {
    if (this.value === value) {
      return true;
    } else if (this.next === null) {
      return false;
    } else {
      return this.next.has(value);
    }
  }

  // TODO: What about existing value?
  add(value) {
    if (this.next === null) {
      this.next = new LinkedNode(value);
    } else {
      this.next.add(value);
    }
  }

  // Delete a descendant node of the given value.
  // Note that it doesn't delete this node even if it has the value.
  delete(value) {
    if (this.next === null) {
      throw new Error(`Item not found ${value}`);
    } else if (this.next.value === value) {
      const next = this.next.next;
      this.next.clean();
      this.next = next;
    } else {
      this.next.delete(value);
    }
  }

  clean() {
    this.value = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.root = null;
  }

  has(value) {
    if (this.isEmpty()) {
      return false;
    } else {
      return this.root.has(value);
    }
  }

  add(value) {
    if (this.isEmpty()) {
      this.root = new LinkedNode(value);
    } else {
      this.root.add(value);
    }
  }

  delete(value) {
    if (this.isEmpty()) {
      throw new Error('Empty list');
    } else if (this.root.value === value) {
      // Delete the root.
      const next = this.root.next;
      this.root.clean();
      this.root = next;
    } else {
      this.root.delete(value);
    }
  }

  toArray() {
    const result = [];
    let node = this.root;
    while (node !== null) {
      result.push(node);
      node = node.next;
    }
    return result;
  }

  isEmpty() {
    return this.root === null;
  }
}

module.exports = LinkedList;

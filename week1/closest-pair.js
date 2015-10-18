'use strict';

var bufferStdin = require('../lib/buffer-stdin');

function sort(compare, arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const len = arr.length;
  const k = Math.floor(len / 2);

  const left = sort(compare, arr.slice(0, k));
  const right = sort(compare, arr.slice(k));

  return merge(compare, left, right);
}

function merge(compare, left, right) {
  const total = left.length + right.length;
  let i = 0;
  let j = 0;
  const merged = new Array(total);
  for (let k = 0; k < total; k++) {
    if (j >= right.length || (i < left.length && compare(left[i], right[j]) < 0)) {
      merged[k] = left[i];
      i++;
    } else {
      merged[k] = right[j];
      j++;
    }
  }
  return merged;
}

function distance(p, q) {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function sortBy(map, arr) {
  return sort((a, b) => map(a) - map(b), arr);
}

function closest(points) {
  const sorted = sortBy(p => p.x, points);
  return closestPair(sorted);
}

function closestPair(px) {
  if (px.length < 2) {
    return null;
  }

  if (px.length === 2) {
    return px;
  }

  const half = Math.floor(px.length / 2);

  const left = px.slice(0, half);
  const right = px.slice(half);

  const pair1 = closestPair(left);
  const pair2 = closestPair(right);

  const distances = [pair1, pair2].filter(Boolean).map(pair => distance(pair[0], pair[1]));
  const delta = Math.min.apply(null, distances);

  const centerX = left[left.length - 1].x;
  const strip = px.filter(p => Math.abs(p.x - centerX) < delta);
  const py = sortBy(p => p.y, strip);

  const pair3 = closestSplitPair(delta, py);

  const candidates = [pair1, pair2, pair3].filter(Boolean);
  return sortBy(pair => distance(pair[0], pair[1]), candidates)[0];
}

function closestSplitPair(delta, py) {
  let minDistance = delta;
  let closest;
  for (let i = 0; i < py.length; i++) {
    // TODO: Should this be 6 instead of 7?
    for (let j = i + 1; j < Math.min(i + 7, py.length); j++) {
      const d = distance(py[i], py[j]);
      if (!closest || d < minDistance) {
        closest = [py[i], py[j]];
        minDistance = d;
      }
    }
  }
  return closest;
}

module.exports = closest;

if (require.main === module) {
  function parseLine(line) {
    const nums = line.split(' ').map((s) => parseFloat(s, 10));
    return { x: nums[0], y: nums[1] };
  }

  function parsePoints(data) {
    return data.split('\n').filter((line) => line.length > 0).map(parseLine);
  }

  bufferStdin((err, input) => {
    if (err) {
      console.error(err);
      return;
    }

    const points = parsePoints(input);
    console.log(closest(points));
  });
}

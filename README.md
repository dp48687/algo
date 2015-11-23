# algo

My humble solutions to programming assignments and related codes of Coursera's [Algorithms: Design and Analysis, Part 1](https://www.coursera.org/course/algo).

Prerequisite:

- Node 5

## week 1

```sh
cat week1/IntegerArray.txt | node week1/inversion.js
```

Closest pairs:

```sh
cat week1/Points.txt | node week1/closest-pair.js
```

## week 2

```sh
cat week2/QuickSort.txt | node week2/quick-sort.js
```

Run unit tests:

```sh
node week2/quick-sort.test.js
```

## week 3

```sh
cat week3/kargerMinCut.txt | node week3/min-cuts.js
```

## week 4

Increase stack size to avoid `RangeError: Maximum call stack size exceeded`.

```sh
cat week4/SCC.txt.gz | zcat | node --stack-size=32000 week4/scc.js
```

Run unit tests:

```sh
node week4/scc.test.js
```

## week 5

```sh
cat week5/dijkstraData.txt | node week5/dijkstra.js
```

Heap and unit tests:

```sh
node week5/heap.test.js
```

## week 6

Question 1:

```sh
cat week6/algo1-programming_prob-2sum.txt | node week6/two-sum.js
```

Question 2:

```sh
cat week6/Median.txt | node week6/median-maintenance.js
```

Hash set and unit tests:

```sh
node week6/hash-set.test.js
```

import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
	input: stream,
	crlfDelay: Infinity,
})

// build trees array
let trees = []
for await (const line of rl) {
	let row = line.split('')
	trees.push(row)
}

// how to find which trees are visible?
// should have matching array of visible or no
// assume all trees not visible
// check all directions (ltr, rtl, utd, dtu)
//      is there anyway to reuse a function to do this?
// if tree is greater than previous max then mark as visible

let visibleMap = trees.map((row) => row.map((tree) => 0))
console.log(trees, visibleMap)

// ltr
for (let i = 0; i < trees.length; i++) {
	let rowMax = -1
	for (let j = 0; j < trees[i].length; j++) {
		if (trees[i][j] > rowMax) {
			rowMax = trees[i][j]
			visibleMap[i][j] = 1
		}
	}
}

// rtl
for (let i = trees.length - 1; i > -1; i--) {
	let rowMax = -1
	for (let j = trees[i].length - 1; j > -1; j--) {
		if (trees[i][j] > rowMax) {
			rowMax = trees[i][j]
			visibleMap[i][j] = 1
		}
	}
}

// utd
for (let i = 0; i < trees.length; i++) {
	let rowMax = -1
	for (let j = 0; j < trees[i].length; j++) {
		if (trees[j][i] > rowMax) {
			rowMax = trees[j][i]
			visibleMap[j][i] = 1
		}
	}
}

// dtu
for (let i = trees.length - 1; i > -1; i--) {
	let rowMax = -1
	for (let j = trees[i].length - 1; j > -1; j--) {
		if (trees[j][i] > rowMax) {
			rowMax = trees[j][i]
			visibleMap[j][i] = 1
		}
	}
}

console.log(visibleMap)
console.log(visibleMap.reduce((acc, v) => acc.concat(v)).reduce((acc, v) => (acc += v)))

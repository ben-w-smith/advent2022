import * as fs from 'fs'
import * as readline from 'readline'

const dataFile = 'test.txt'
// const dataFile = 'data.txt'
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

const scenicScore = function (trees, x, y) {
	const height = trees[x][y]
	let i, j

	// ltr
	let ltr = 0
	for (let i = x; i < trees.length; i++) {
		let rowMax = -1
		for (let j = y; j < trees[i].length; j++) {
			if (trees[i][j] > rowMax) {
				rowMax = trees[i][j]
				ltr++
			}
		}
	}

	// rtl
	let rtl = 0
	for (let i = x; i > -1; i--) {
		let rowMax = -1
		for (let j = y; j > -1; j--) {
			if (trees[i][j] > rowMax) {
				rowMax = trees[i][j]
				rtl++
			}
		}
	}

	// utd
	let utd = 0
	for (let i = y; i < trees.length; i++) {
		let rowMax = -1
		for (let j = x; j < trees[i].length; j++) {
			if (trees[j][i] > rowMax) {
				rowMax = trees[j][i]
				utd++
			}
		}
	}

	// dtu
	let dtu = 0
	for (let i = y; i > -1; i--) {
		let rowMax = -1
		for (let j = x; j > -1; j--) {
			if (trees[j][i] > rowMax) {
				rowMax = trees[j][i]
				dtu++
			}
		}
	}

	return ltr * rtl * utd * dtu
}

const score = scenicScore(trees, 1, 2)
console.log(score)

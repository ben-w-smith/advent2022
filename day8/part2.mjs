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

const scenicScore = function (trees, x, y) {
	if(x < 0 || x > trees.length) {
		return false
	}
	if(y < 0 || y > trees[x].length) {
		return false
	}

	const height = trees[x][y]
	let max = 0

	// [
	// 	[0,0,0],
	// 	[0,0,0],
	// 	[0,0,0],
	// ]

	let ltr = 0
	for(let i = x+1; i < trees.length; i++) {
		ltr++
		let curr = trees[i][y]
		if(curr >= height) {
			break;
		}
	}

	let rtl = 0
	for(let i = x-1; i > -1; i--) {
		rtl++
		let curr = trees[i][y]
		if(curr >= height) {
			break;
		}
	}

	let utd = 0
	for(let j = y+1; j < trees.length; j++) {
		utd++
		let curr = trees[x][j]
		if(curr >= height) {
			break;
		}
	}

	let dtu = 0
	for(let j = y-1; j > -1; j--) {
		dtu++
		let curr = trees[x][j]
		if(curr >= height) {
			break;
		}
	}

	let answer = [ltr, rtl, utd, dtu, ltr * rtl * utd * dtu]
	return ltr * rtl * utd * dtu
}

let max = 0
let coord = []
for(let i = 1; i < trees.length - 1; i++) {
	for(let j = 1; j < trees[i].length - 1; j++) {
		let score = scenicScore(trees, i, j)
		if(score > max) {
			max = score
			coord = [i, j]
		}
	}
}

			console.log(max)
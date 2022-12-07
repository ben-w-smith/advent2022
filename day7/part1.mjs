import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
	input: stream,
	crlfDelay: Infinity,
})

// commands
// $ cd [node]
// $ cd ..
// $ ls

// outputs
// dir [node]
// [filesize] [filename]
const Dir = function (name = null, parent = null) {
	this.name = name
	this.parent = parent
	this.path = [this.name]
	while (parent !== null) {
		this.path.push(parent.name)
		parent = parent.parent
	}
	this.path = this.path.reverse().join('/')
	this.size = 0
	this.children = []
}

// lets just worry about making a tree of dirs first

let first = true
let node = null
let root = null
for await (const line of rl) {
	// commands
	if (line[0] === '$') {
		const command = line.substring(2).split(' ')
		if (command[0] === 'cd') {
			if (command[1] === '..') {
				node = node.parent
			} else {
				if (first) {
					node = new Dir('.', null)
					root = node
					first = false
				} else {
					node = node.children.find((n) => n.name === command[1])
				}
			}
		} else {
			// ls doesn't matter in this setup?
		}
	} else {
		// output
		const output = line.split(' ')
		if (output[0] === 'dir') {
			node.children.push(new Dir(output[1], node))
		} else {
			node.size += parseFloat(output[0])
		}
	}
}

// now parse the dir tree
// this will be recursive
// hmmm I can cheat by including all sub dirs in the sum of a dir that is smaller than 100k
function dirSize(node, size = 0) {
	size += node.size
	if (node.children.length === 0) return size

	return node.children.reduce((acc, n) => {
		acc += dirSize(n)
		return acc
	}, size)
}
// sanity test
// let size = dirSize(root)
// console.log(size)

// now to walk the dirs and sum all of them
function walkDirs(node, map = {}) {
	map[node.path] = dirSize(node)
	if (node.children.length === 0) return map

	return node.children.reduce((acc, n) => {
		return walkDirs(n, acc)
	}, map)
}
let sizes = walkDirs(root)
// console.log(sizes)

// finally we can check and sum
let sum = 0
for (const key in sizes) {
	if (sizes[key] < 100000) {
		sum += sizes[key]
	}
}
console.log(sum)

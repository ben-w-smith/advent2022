import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'

const buildStacks = async function (dataFile) {
	const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
	const rl = readline.createInterface({
		input: stream,
		crlfDelay: Infinity,
	})

	let stacks = []
	let firstLine = true
	for await (const line of rl) {
		if (firstLine) {
			stacks = new Array((line.length + 1) / 4).fill(null).map((v) => [])
			firstLine = false
		}

		for (let i = 0; i <= (line.length + 1) / 4; i++) {
			let column = line[i * 4 + 1] || ''
			if (column.match(/[a-z]/i)) {
				stacks[i].unshift(column)
			}
		}

		if (line === '') {
			return stacks
		}
	}

	throw Error('Reach end of file.')
}

const parseMoves = async function (dataFile) {
	let stacks = await buildStacks(dataFile)

	const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
	const rl = readline.createInterface({
		input: stream,
		crlfDelay: Infinity,
	})

	for await (const line of rl) {
		if (!line.match(/move/i)) continue

		let [match, ...captures] = /.*?(\d+).*?(\d+).*?(\d+)/.exec(line)
		let [amount, src, target] = captures.map((v) => parseFloat(v))
		target = target - 1
		src = src - 1
		let moveStack = stacks[src].slice(-amount)
		stacks[target].push(...moveStack)
		stacks[src] = stacks[src].splice(0, stacks[src].length - amount)
	}
	return stacks
}

let stacks = await parseMoves(dataFile)
console.log(stacks)
let answer = []
for (let stack of stacks) {
	answer.push(stack.pop())
}
console.log(answer.join(''))

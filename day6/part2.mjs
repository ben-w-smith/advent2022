import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
	input: stream,
	crlfDelay: Infinity,
})

let answer = null
for await (const line of rl) {
	for (let i = 0; i < line.length - 14; i++) {
		let string = line.substring(i, i + 14)
		let test = new Set(string)
		if (test.size === 14) {
			answer = i + 14
			break
		}
	}
}

console.log(answer)

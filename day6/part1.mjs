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
	for (let i = 0; i < line.length - 4; i++) {
		let string = line.substring(i, i + 4)
		let test = new Set(string)
		if (test.size === 4) {
			answer = i + 4
			break
		}
	}
}

console.log(answer)

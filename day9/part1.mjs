import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
	input: stream,
	crlfDelay: Infinity,
})

// head starts over tail
// start does not count as a visited tail location
// tail will always be 1 distance from head
// so keep coord for head and tail, if head is 2 dist away from tail, move tail
// save coords visited by tail

let head = [0,0]
let tail = [0,0]
let visited = []
for await (const line of rl) {
	let [dir, steps] = line.split(' ')
	while(steps > 0) {
		// move head
		switch(dir) {
			case 'R':
				head[0]++
				break;
			case 'L':
				head[0]--
				break;
			case 'U':
				head[1]++
				break;
			case 'D':
				head[1]--
				break;
			default:
				throw new Error('unmatched direction: ', dir)
		}

		// what is dist? how to calc
		const dist = [head[0] - tail[0], head[1] - tail[1]]
		if(Math.abs(dist[0]) > 1 || Math.abs(dist[1]) > 1) {

			switch(dir) {
				case 'R':
					tail[0]++
					tail[1] = tail[1] + dist[1]
					break;
				case 'L':
					tail[0]--
					tail[1] = tail[1] + dist[1]
					break;
				case 'U':
					tail[1]++
					tail[0] = tail[0] + dist[0]
					break;
				case 'D':
					tail[1]--
					tail[0] = tail[0] + dist[0]
					break;
				default:
					throw new Error('unmatched tail direction: ', dir)
			}

			const coord = tail.join(',')

			// log new coord of tail
			if(!visited.includes(coord)) visited.push(coord)
		}

		steps--
	}
}

console.log(visited, visited.length + 1)
import * as fs from 'fs'
import * as readline from 'readline'

const dataFile = 'p2Ans.txt'
// const dataFile = 'data.txt'
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

let grid = []
for await (const line of rl) {
    grid.push(line.split(''))
}

// now find the s
const row = grid.findIndex(row => row.includes('s'))
const col = grid[row].indexOf('s')
const origin = [col, row]

console.log(origin)

// now find all the coords
let visited = []
for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
        if(grid[y][x] === '#') {
            visited.push([x - origin[0], origin[1] - y].join(','))
        }
    }
}

console.log(visited, visited.length + 1)
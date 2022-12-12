import * as fs from 'fs'
import * as readline from 'readline'


// grid starts over tail
// start does not count as a visited tail location
// tail will always be 1 distance from grid
// so keep coord for grid and tail, if grid is 2 dist away from tail, move tail
// save coords visited by tail

const bounds = await getBounds()

const dataFile = 'test.txt'
// const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
	input: stream,
	crlfDelay: Infinity,
})

let Knot = function(prev = null) {
    this.prev = prev
    this.next = null 
    this.dir = null
    this.x = 0
    this.y = 0 
    this.coord = () => {
        return [this.x, this.y]
    }
}

let rope = new Knot()
let prev = rope 
for(let i = 0; i < 10; i++) {
    let knot = new Knot(prev)
    prev.next = knot
    prev = knot
}

let visited = []
for await (const line of rl) {
	let [dir, steps] = line.split(' ')
	while(steps > 0) {
		// move grid
		switch(dir) {
			case 'R':
				rope.x++
				break;
			case 'L':
				rope.x--
				break;
			case 'U':
				rope.y++
				break;
			case 'D':
				rope.y--
				break;
			default:
				throw new Error('unmatched direction: ', dir)
		}

        let knot = rope 
        while(knot.next !== null) {
            stepKnot(knot, knot.next, dir)
            // printRope(rope, bounds)
            knot = knot.next
        }

        // printRope(rope, bounds)

        const tail = knot
        const coord = tail.coord().join(',')

        // log new coord of tail
        if(!visited.includes(coord)) visited.push(coord)

		steps--
	}
    printRope(rope, bounds)
}

function stepKnot(head, tail, dir) {
    const dist = { x: head.x - tail.x, y: head.y - tail.y }
    if(Math.abs(dist.x) > 1 && Math.abs(dist.y) > 1) {
        let hey = 'yo'
    }

    let knotDir = dir 
    if(Math.abs(dist.x) === 2 && Math.abs(dist.y) === 1) {
        if(dist.x > 0) {
            knotDir = 'R'
        } else {
            knotDir = 'L'
        }
    } else if(Math.abs(dist.y) === 2 && Math.abs(dist.x) === 1) {
        if(dist.y > 0) {
            knotDir = 'U'
        } else {
            knotDir = 'D'
        }
    }

    if(Math.abs(dist.x) > 1 || Math.abs(dist.y) > 1) {

        switch(knotDir) {
            case 'R':
                tail.x++
                tail.y = tail.y + dist.y
                break;
            case 'L':
                tail.x--
                tail.y = tail.y + dist.y
                break;
            case 'U':
                tail.y++
                tail.x = tail.x + dist.x
                break;
            case 'D':
                tail.y--
                tail.x = tail.x + dist.x
                break;
            default:
                throw new Error('unmatched tail direction: ', dir)
        }
    }
}

async function getBounds() {
    const dataFile = 'test.txt'
    // const dataFile = 'data.txt'
    const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    })

    let min = { x: 0, y: 0 }
    let max = { x: 0, y: 0 }
    let grid = { x: 0, y: 0 }
    for await (let line of rl) {
        let [dir, steps] = line.split(' ')
        steps = parseFloat(steps)
		switch(dir) {
			case 'R':
				grid.x += steps
				break;
			case 'L':
				grid.x -= steps
				break;
			case 'U':
				grid.y += steps
				break;
			case 'D':
				grid.y -= steps
				break;
			default:
				throw new Error('unmatched direction: ', dir)
		}
        max = { 
            x: Math.max(max.x, grid.x),
            y: Math.max(max.y, grid.y)
        }
        min = { 
            x: Math.min(min.x, grid.x),
            y: Math.min(min.y, grid.y)
        }
        let j = 1 + 1
    }
    return {
        min: min, 
        max: max,
        origin: {
            x: Math.abs(min.x),
            y: Math.abs(max.y),
        },
    }
}

function printRope(knot, bounds) {
    const width = Math.abs(bounds.min.x) + Math.abs(bounds.max.x)
    const height = Math.abs(bounds.min.y) + Math.abs(bounds.max.y)
    let grid = Array(height).fill('.').map(h => Array(width).fill('.'))


    let max = {x: 0, y: 0}
    let min = {x: 0, y:0}
    let count = 0
    while(knot.next !== null) {
        const coord = {
            x: bounds.origin.x + knot.x,
            y: bounds.origin.y - knot.y,
        }

        let stamp = count 
        if(count === 0) stamp = 'H'
        // if(count === 9) stamp = 'T'

        if(grid[coord.y][coord.x] === '.' || stamp === 'H') {
            grid[coord.y][coord.x] = stamp
        }

        knot = knot.next
        count++
    }

    if(grid[bounds.origin.y][bounds.origin.x] === '.') grid[bounds.origin.y][bounds.origin.x] = 's'

    let display = grid.map(row => row.join('')).join('\n')
    console.log(display, '\n')
    return grid
}









// ---
// ---
// ---

// const answer = [
//     '-1,-5', '-10,3', '-11,4', '-11,5',
//     '-11,6', '-2,-5', '-3,-4', '-4,-3',
//     '-5,-2', '-6,-1', '-7,0',  '-8,1',
//     '-9,2',  '0,-5',  '1,-5',  '1,1',
//     '1,3',   '10,0',  '2,-5',  '2,2',
//     '2,4',   '3,-5',  '3,5',   '4,-5',
//     '4,5',   '5,-5',  '5,5',   '6,-4',
//     '6,4',   '7,-3',  '7,3',   '8,-2',
//     '8,2',   '9,-1',  '9,1'
// ]

// const correct = answer.length === visited.length && answer.every((coord) => visited.includes(coord)) 
// const missing = answer.filter(coord => !visited.includes(coord))
// const extra = visited.filter(coord => !answer.includes(coord))

// console.log(answer, visited.sort(), missing, extra, answer.length, visited.length, correct)


// console.log(visited, visited.length + 1)
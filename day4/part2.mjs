import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})

const buildGroup = function(minmax) {
    const [min, max] = minmax.split('-').map(v => parseFloat(v))
    const group = Array.from(new Array(max - min + 1)).map((v, i) => min + i)
    return new Set(group)
}

let overlaps = 0
for await(const line of rl) {
    const [e1, e2] = line.split(',')
    const g1 = buildGroup(e1)
    const g2 = buildGroup(e2)

    // compare sets
    const intersect = new Set([...g1, ...g2])

    // console.log(e1,e2)
    // console.log(intersect.size < (g1.size + g2.size))
    // console.log(Math.min(...g1), Math.max(...g1), Math.min(...g2), Math.max(...g2))
    // console.log((Math.min(...g1) == Math.min(...g2) && Math.max(...g1) == Math.max(...g2)))
    if(intersect.size < (g1.size + g2.size)
        || (Math.min(...g1) == Math.min(...g2) && Math.max(...g1) == Math.max(...g2))
    ) {
        // console.log(e1, e2)
        overlaps++
    }
}

console.log(overlaps)
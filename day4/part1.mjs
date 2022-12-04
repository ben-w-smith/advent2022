import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})


let overlaps = 0
for await(const line of rl) {
    const [e1, e2] = line.split(',')
    const [min1, max1] = e1.split('-').map(v => parseFloat(v))
    const [min2, max2] = e2.split('-').map(v => parseFloat(v))

    if(min1 >= min2 && max1 <= max2
        || min1 <= min2 && max1 >= max2
    ) {
        const check = [min1 >= min2 && max1 <= max2, min2 >= min1 && max2 <= max1]
        overlaps++
    }
}

console.log(overlaps)
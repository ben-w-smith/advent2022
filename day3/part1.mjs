
import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})

const priorityMap = Array.from(Array(26)).map((v, i) => String.fromCharCode(i + 97))
    .concat(Array.from(Array(26)).map((v, i) => String.fromCharCode(i + 65)))
    .reduce((acc, val, i) => {
        acc[val] = i+1
        return acc
    }, {})


let sum = 0
for await(const line of rl) {
    // split line
    const [c1, c2]= [line.substring(0, line.length / 2), line.substring((line.length + 1) / 2)]

    // find shared item
    for(const item of c1) {
        if(c2.includes(item)) {
            sum += priorityMap[item]
            break;
        }
    }
}

console.log(sum)
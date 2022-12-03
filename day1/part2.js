const fs = require('fs')
const readline = require('readline')
const path = require('path')
const PriorityQueue = require('fastpriorityqueue')

const dataFile = 'data.txt'
const stream = fs.createReadStream(path.resolve(__dirname, dataFile))
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})

main()
async function main() {
    let maxes = new PriorityQueue()
    maxes.add(0)
    maxes.add(0)
    maxes.add(0)

    let current = 0
    for await (const line of rl) {
        if(line == '') {
            const max = maxes.peek()
            if(current > max) {
                maxes.removeOne((val) => { return (val === max) })
                maxes.add(current)
            }
            current = 0
            continue
        }
        current += parseFloat(line)
    }

    let sum = 0
    maxes.forEach((v) => sum += v)
    console.log(sum)
}
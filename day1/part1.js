const fs = require('fs')
const readline = require('readline')
const path = require('path')

const dataFile = 'data.txt'
const stream = fs.createReadStream(path.resolve(__dirname, dataFile))
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})

let max = 0
let current = 0
rl.on('line', (line) => {
    if(line == '') {
        if(current > max) {
            max = current
        }
        current = 0
        return
    }
    current += parseFloat(line)
})

rl.on('close', (line) => {
    console.log(max)
})
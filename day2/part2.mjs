
import * as fs from 'fs'
import * as readline from 'readline'

// const dataFile = 'test.txt'
const dataFile = 'data.txt'
const stream = fs.createReadStream(new URL(dataFile, import.meta.url))
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})

const shapeMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
}

const rpsResult = function(shape1, shape2) {
    let result = 0

    // tie condition
    if(shape1 === shape2) {
        return 3
    }

    // win conditions
    if(shape1 === 'rock' && shape2 === 'paper'
        || shape1 === 'scissors' && shape2 === 'rock'
        || shape1 === 'paper' && shape2 === 'scissors'
    ) {
        result = 6
    } else {
        // losses
        result = 0
    }

    return result
}

const shapePoints = function(shape) {
    let result = 0
    if(shape === 'rock') {
        result = 1
    } else if(shape === 'paper') {
        result = 2
    } else {
        result = 3
    }
    return result
}

const resultToShape = function(shape, result) {
    if(result === 'Y') {
        return shape
    } 
    if(result === 'X') {
        switch(shape) {
            case 'rock':
                return 'scissors'
            case 'paper':
                return 'rock'
            case 'scissors':
                return 'paper'
        }
    }
    if(result === 'Z') {
        switch(shape) {
            case 'rock':
                return 'paper';
            case 'paper':
                return 'scissors'
            case 'scissors':
                return 'rock'
        }
    }
}

const roundToShapes = function(round) {
    let [shape, result] = round.split(' ')
    shape = shapeMap[shape]
    result = resultToShape(shape, result)
    return [shape, result]
}

const roundResult = (round) => {
    let shapes = roundToShapes(round)
    const result = rpsResult(...shapes) + shapePoints(shapes[1])
    return result
}

let total = 0
for await(const line of rl) {
    let r = roundResult(line)
    total += r
}

console.log(total)
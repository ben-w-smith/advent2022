
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

const findBadgePriority = function(group) {
        const [g1, g2, g3] = group

        for(let i = 0; i < g1.length; i++) {
            for(let j = 0; j < g2.length; j++) {
                if(g1[i] != g2[j]) continue

                for(let k = 0; k < g3.length; k++) {
                    const s = new Set([g1[i], g2[j], g3[k]])
                    if(s.size === 1) {
                        return priorityMap[g1[i]]
                    }
                }
            }
        }
}

let sum = 0
let group = []
for await(const line of rl) {
    group.push([...new Set(line.split('').sort())])

    if(group.length === 3) {
        sum += findBadgePriority(group)
        group = []
    }
}

console.log(sum)
var csv = require('csv')

const { Fuzzify, Implicate, Defuzzify } = require('./fuzzy')
const config = require('./config.json')

const { inputs, rules, output } = config
const cripsSet = [80, 100]
const fuzzySet = Fuzzify(cripsSet, inputs)
const results = Implicate(fuzzySet, rules, output)
const finalResult = Defuzzify(results, output)



console.log(outputs)

// const { inputs, rules, output } = config
// for (let i = 0; i < 200; i+=2) {
//     const cripsSet = [80, i]
//     const fuzzySet = Fuzzify(cripsSet, inputs)
//     const results = Implicate(fuzzySet, rules, output)
//     const finalResult = Defuzzify(results, output)
//     outputs.push(finalResult)
// }

// console.log(outputs)

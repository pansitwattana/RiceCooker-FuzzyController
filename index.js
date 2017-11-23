const { Fuzzify, Implicate, Defuzzify } = require('./fuzzy')
const config = require('./config.json')

const { inputs, rules, output } = config
const cripsSet = [80, 90]
console.log('input', cripsSet)
const fuzzySet = Fuzzify(cripsSet, inputs)
console.log('fuzzy set', fuzzySet)
console.log('rules ', rules)

const results = Implicate(fuzzySet, rules, output)
console.log('outputs ', results)

const finalResult = Defuzzify(results, output)
console.log(finalResult)

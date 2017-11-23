const fuzzify = (crispSet, inputs) => {
  // console.log(crispSet)
  const fuzzySets = crispSet.map((val, i) => {
    const sets = inputs[i].sets
    console.log('sets:', sets)
    const results = sets.map(set => {
      if (val < set[0]) return 0
      else if (val < set[1]) {
        return 1 / (set[1] - set[0]) * (val - set[0])
      } else if (val <= set[2]) {
        return 1
      } else if (val < set[3]) {
        return 1 - 1 / (set[3] - set[2]) * (val - set[2])
      } else {
        return 0
      }
    })
    return results
  })
  return fuzzySets
}

const findX = (y, input) => {
  console.log('findx', y)
  console.log('input', input)
  return [0]
}

module.exports = {
  Fuzzify: fuzzify,
  Implicate: (fuzzySets, rules, output) => {
    // console.log(output)
    const results = rules.map((rule, index) => {
      inputRule = rule.slice(0, rule.length - 1)
      // const set = fuzzySets[rule[0]]
      // console.log(fuzzySets)
      // console.log(fuzzySets)
      const outputs = inputRule.map((input, index) => {
        return fuzzySets[index][input]
      })
      console.log('input', outputs)
      const min = Math.min(...outputs)
      const outputRule = rule[rule.length - 1]
      console.log('min', min)
      console.log(outputRule)
      const outputFuzzy = {
        value: min,
        rule: outputRule
      }
      return outputFuzzy
    })
    // console.log(results)
    const outputFuzzy = output.sets.map(() => [])
    results.forEach(result => {
      outputFuzzy[result.rule].push(result.value)
    })
    // console.log(outputFuzzy)
    const maxOutput = outputFuzzy.map(output => {
      return Math.max(...output)
    })
    return maxOutput
  },
  Defuzzify: (results, output) => {
    // console.log(output)
    const values = output.sets.map((set, i) => {
      let coordinates = []
      const y = results[i]
      console.log(set, y)
      if (y === 0) {
        return 0
      }
      if (y === 1) {
        return 1
      }
      
      coordinates.push([set[0], 0])

      if (set[1] !== set[0]) {
        const m = 1 / (set[1] - set[0])
        let x = (y + m * set[0]) / m
        coordinates.push([x, y])
      }

      if (set[2] !== set[1]) {
        const m = 1 / (set[2] - set[1])
        let x = (y + m * set[1]) / m
        coordinates.push([x, y])
      }

      if (set[3] !== set[2]) {
        const m = 1 / (set[3] - set[2])
        let x = (y + m * set[2]) / m
        coordinates.push([x, y])
      }

      coordinates.push([set[3], 0])
      return coordinates
    })

    console.log('start find centroid')
    let max = 0
    let min = 0
    values.forEach(value => {
      if (value instanceof Array) {
        value.forEach(val => {
          if (val[0] > max) {
            max = val[0]
          }
          if (val[0] < min) {
            min = val[0]
          }
        })
      }
    })
    
    let area = 0
    let xfx = 0
    const step = 0.1
    for (let i = min; i <= max; i += step) {
      let points
      values.forEach(value => {
        if (value) {
          // console.log(value)
          for (let k = 0; k < value.length; k++) {
            const currentValue = value[k]
            const nextValue = value[k+1]

            if (currentValue && nextValue) {
              if (i >= currentValue[0] && i <= nextValue[0]) {
                points = [currentValue, nextValue]
              }
            }

          }
        }
        if (points) {
          // console.log(i, points)
          const y1 = points[0][1]
          const y2 = points[1][1]
          const x1 = points[0][0]
          const x2 = points[1][0]
          const m = (y2 - y1)/(x2 - x1)
          const c = y1 - m * x1
          let y = m*i + c
          xfx += i*y
          area += y
          // console.log(i, y)
        }
      })
    }

    return xfx / area
  }
}

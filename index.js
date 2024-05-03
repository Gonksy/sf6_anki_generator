const { processSheets, generateQuestions } = require("./modules")
const fs = require("fs")
const util = require("util")
const path = "./resources/charData.json"
let charData = fs.existsSync(path) ? require(path) : undefined

if (!charData) {
  console.log(`Sheets not found. Generating sheets from local sf6Data.xlsx`)
  charData = processSheets()()
} else {
  console.log(`Existing sheets loaded successfully`)
}

// // Test fetching sheet
// const guile = charData.guile
// console.log(util.inspect(guile, { depth: 0 }))

// Test generateQuestions module
generateQuestions(charData)

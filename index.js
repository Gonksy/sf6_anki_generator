const { processSheets } = require("./modules")
const fs = require("fs")
const util = require("util")
const path = "./resources/charData.json"
let sheets = fs.existsSync(path) ? require(path) : undefined

if (!sheets) {
  console.log(`Sheets not found. Generating sheets from local sf6Data.xlsx`)
  sheets = processSheets()()
} else {
  console.log(`Existing sheets loaded successfully`)
}

const guile = sheets.guile
console.log(util.inspect(guile, { depth: 0 }))

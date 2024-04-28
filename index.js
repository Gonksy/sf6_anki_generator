const { processSheets } = require("./helpers")
const fs = require("fs")
const util = require("util")
const path = "./sheets/sheets.json"
const sheets = fs.existsSync(path) ? require(path) : undefined

if (!sheets) {
  console.log(`Sheets not found. Generating sheets from local sf6Data.xlsx`)
  processSheets()()
} else {
  console.log(`Existing sheets loaded successfully`)
}

console.log(util.inspect(sheets["Ryu"].normals, { depth: 1 }))

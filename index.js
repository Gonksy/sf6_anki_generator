const { processSheets } = require("./helpers")
const fs = require("fs")
const path = "./sheets/sheets.json"
const sheets = fs.existsSync(path) ? require(path) : undefined
console.log(sheets)

if (!sheets) {
  console.log(`Sheets not found. Generating sheets from local sf6Data.xlsx`)
  processSheets()()
} else {
  console.log(`Existing sheets loaded successfully`)
}

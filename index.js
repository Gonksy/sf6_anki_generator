const XLSX = require("xlsx")
const workbook = XLSX.readFile("./sf6Data.xlsx")
const util = require("util")

const { SheetNames } = workbook

const normalSheets = SheetNames.filter((sheetName) =>
  sheetName.includes("Normal")
).reduce((obj, currentSheetName) => {
  const currentSheet = XLSX.utils.sheet_to_json(
    workbook.Sheets[currentSheetName]
  )
  obj[currentSheetName] = currentSheet
  return obj
}, {})

const { RyuNormal } = normalSheets
RyuNormal.forEach((move) => {
  console.log(`How plus/minus is ${move.moveName} on block?`)
  console.log(`${move.moveName} is ${move.onBlock} on block`)
})

// console.log(normalSheetNames)

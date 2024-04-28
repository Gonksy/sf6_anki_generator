const fs = require("fs")
const XLSX = require("xlsx")
const util = require("util")
const roster = require("./roster.json")

function processSheets() {
  const workbook = XLSX.readFile("./sf6Data.xlsx"),
    sheets = JSON.stringify(
      roster.reduce((obj, currChar) => {
        const stats = XLSX.utils
          .sheet_to_json(workbook.Sheets[`${currChar}Stats`])
          .reduce((obj, { name, stat }) => {
            obj[name] = stat
            return obj
          })
        const normals = XLSX.utils.sheet_to_json(
          workbook.Sheets[`${currChar}Normal`]
        )
        // ******************************
        // ADD POSSIBLE CHARACTER INSTALLS HERE
        // ******************************

        obj[currChar] = { stats: stats, normals: normals }
        return obj
      }, {})
    )

  return function () {
    fs.writeFile("./sheets/sheets.json", sheets, (err) => {
      if (err) {
        throw new Error(`Failed to write file: Sheets.json`)
      } else {
        console.log(`Sheets.json: file saved successfully`)
      }
    })
  }
}

function parseSheet() {}

module.exports = { processSheets, parseSheet }

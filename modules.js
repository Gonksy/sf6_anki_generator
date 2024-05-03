const fs = require("fs")
const XLSX = require("xlsx")
const util = require("util")
const roster = require("./resources/roster.json")
const installChars = require("./resources/installChars.json")
const questions = require("./resources/questions.json")

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
        let install = null
        if (installChars.includes(currChar)) {
          const installSheetNames = workbook.SheetNames.filter(
            (sheetName) =>
              sheetName.includes(currChar) &&
              !sheetName.includes("Normal") &&
              !sheetName.includes("Stats")
          )
          const installSheets = installSheetNames.reduce((obj, sheetName) => {
            const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
            const key = sheetName
              .substring(sheetName.indexOf(currChar) + currChar.length)
              .trim()
            obj[key] = sheet
            return obj
          }, {})
          install = installSheets
        }
        obj[currChar.toLowerCase()] = {
          stats: stats,
          moves: normals,
          installs: install,
        }
        return obj
      }, {})
    )

  return function () {
    fs.writeFile("./resources/charData.json", sheets, (err) => {
      if (err) {
        throw new Error(`Failed to write file: Sheets.json`)
      } else {
        console.log(`Sheets.json: file saved successfully`)
      }
    })
    return JSON.parse(sheets)
  }
}

function generateQuestions(charData) {
  console.log("questions", questions)
  console.log("charData", util.inspect(charData, { depth: 1 }))

  for (const character in charData) {
    const moves = charData[character].moves
    const stats = charData[character].stats
    const installs = charData[character].installs

    moves.forEach((move) => {
      // lord forgive me
      questions.forEach((question) => {
        console.log("oh...")
      })
    })
  }
}

module.exports = { processSheets, generateQuestions }

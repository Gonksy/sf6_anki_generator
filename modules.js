const fs = require("fs")
const XLSX = require("xlsx")
const util = require("util")
const roster = require("./resources/static/roster.json")
const installChars = require("./resources/static/installChars.json")
const questions = require("./resources/static/questions")

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
    fs.writeFileSync("./resources/generated/charData.json", sheets)
    console.log(`charData.json: file saved successfully (2)`)
    return JSON.parse(sheets)
  }
}

function generateQuestions(charData) {
  const cardBank = {}
  for (const character in charData) {
    const moves = charData[character].moves
    const stats = charData[character].stats
    const installs = charData[character].installs

    const cards = []

    moves.forEach((move) => {
      // lord forgive me
      questions.forEach((question) => {
        const moveQuestion = question.question(move.moveName)
        const reference = move[question.ref]
        const moveAnswer = question.answer(reference)
        const questionCard = {
          question: moveQuestion,
          answer: moveAnswer,
          difficulty: question.difficulty,
        }
        cards.push(questionCard)
      })
    })
    cardBank[character] = cards
  }
  const cardBankJSON = JSON.stringify(cardBank)

  return function () {
    fs.writeFileSync(`./resources/generated/cardBank.json`, cardBankJSON)
    console.log(`cardBank.json: file saved successfully (2)`)
    return JSON.parse(cardBankJSON)
  }
}

module.exports = { processSheets, generateQuestions }

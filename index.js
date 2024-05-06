const { processSheets, generateQuestions } = require("./modules")
const fs = require("fs")
const util = require("util")
const charDataPath = "./resources/generated/charData.json"
const cardBankPath = "./resources/generated/cardBank.json"
let charData = fs.existsSync(charDataPath) ? require(charDataPath) : undefined
let cardBank = fs.existsSync(cardBankPath) ? require(cardBankPath) : undefined

if (!charData) {
  console.log(
    `Char data not found. Generating char data from local sf6Data.xlsx (1)`
  )
  charData = processSheets()()
  console.log(`Char data generated successfully (3)`)
} else {
  console.log(`Existing sheets loaded successfully`)
}

if (!cardBank) {
  console.log(`Card bank not found. Generating cards from character data. (1)`)
  cardBank = generateQuestions(charData)()
  console.log(`Card bank generated successfully (3)`)
} else {
  console.log(`Existing card bank loaded successfully`)
}

//Test cardbank

console.log(util.inspect(cardBank, { depth: 0 }))

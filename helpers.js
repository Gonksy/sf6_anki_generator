const fs = require("fs")
const XLSX = require("xlsx")

function createJSONWriter() {
  function write(fileName, data, err) {
    try {
      if (err) {
        throw new Error(err)
      }
      const dataJSON = JSON.stringify(data)
      const filePath = `./sheets/${fileName}.json`
      fs.writeFile(filePath, dataJSON, (err) => {
        if (err) {
          throw new Error(`Failed to write file: ${filePath}`)
        } else {
          console.log(`${filePath}: file saved successfully`)
        }
      })
    } catch (e) {
      console.log(e.message)
    }
  }
  return write
}

function processSheets() {
  const save = createJSONWriter(),
    workbook = XLSX.readFile("./sf6Data.xlsx"),
    { SheetNames } = workbook,
    normalSheets = SheetNames.filter((sheetName) =>
      sheetName.includes("Normal")
    ).reduce((obj, currentSheetName) => {
      const currentSheet = XLSX.utils.sheet_to_json(
        workbook.Sheets[currentSheetName]
      )
      obj[currentSheetName] = currentSheet
      return obj
    }, {})

  function createSheets() {
    for (const characterName in normalSheets) {
      const characterSheet = normalSheets[characterName]
      save(characterName, characterSheet)
    }
  }
  return createSheets
}

module.exports = { createJSONWriter, processSheets }

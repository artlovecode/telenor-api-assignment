const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const findDescendents = require('./findDescendents')
const makeUnique = require('./makeUnique')

test('should correctly find the descendents', async (done) => {
  expect.assertions(1)
  const testCsvData = fs.readFileSync(path.resolve(__dirname, '..', 'data.csv')).toString()

  const nodePairs = await csv().fromString(testCsvData)

  const expectedResult = ['E', 'F', 'H', 'I']
  const result = makeUnique(findDescendents('C', nodePairs))
  expect(result).toEqual(expectedResult)
  done()
})

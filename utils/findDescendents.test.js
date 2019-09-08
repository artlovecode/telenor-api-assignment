const findDescendents = require('./findDescendents')
const fs = require('fs')
const path = require('path')
const parseCSV = require('./findDescendents').parseCSV

test('should correctly find the descendents', async (done) => {
  expect.assertions(1)
  const testArray = fs.readFileSync(path.resolve(__dirname, 'data.csv')).toString()

  const [parents, children] = await parseCSV(testArray)
  const expectedResult = ['E', 'F', 'H', 'I']
  const result = findDescendents('C', parents, children)
  expect(result).toEqual(expectedResult)
  done()
})

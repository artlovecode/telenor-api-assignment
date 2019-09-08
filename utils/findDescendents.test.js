const findDescendents = require('./findDescendents').findDescendents
const splitCSVToChildrenParents = require('./findDescendents').splitCSVToChildrenParents

test('should correctly find the descendents', () => {
  const testArray = [
    'A,C',
    'A,D',
    'A,E',
    'B,D',
    'B,G',
    'C,E',
    'C,F',
    'D,G',
    'G,I',
    'E,H',
    'F,E',
    'F,I'
  ]
  const [parents, children] = splitCSVToChildrenParents(testArray)
  const expectedResult = ['E', 'F', 'H', 'I']
  const result = findDescendents('C', parents, children)
  console.log(result)
  expect(result).toEqual(expectedResult)
})

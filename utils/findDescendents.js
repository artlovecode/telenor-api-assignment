const csv = require("csvtojson")

/*
 * Recursively constructs a list of all descendents of a particular node.
 * This solution exploits the pairwise string representation of the models,
 * going one layer down at each recursion until it can find no more children
 */
const findDescendents = (node, parentArray, childArray, nodesFound = []) => {
  if (parentArray.indexOf(node) === -1 && childArray.indexOf(node) === -1) {
    throw `${node} is not a valid node`
  }
  const children = parentArray
    .map((parent, index) => index)
    .filter(index => parentArray[index] === node)
    .map(index => childArray[index])
    .filter(child => nodesFound.indexOf(child) === -1)

  const found = [...nodesFound, ...children]

  if (children.length === 0) {
    return node
  } else if (children.length === 1) {
    return children.map(child => findDescendents(child, parentArray, childArray, found))
  } else {
    return [...children, ...children.map(child => findDescendents(child, parentArray, childArray, found))].flat()
  }
}

const parseCSV = async csvString => {
  const jsonified = await csv()
    .fromString(csvString)
    .then(res => {
      return res
    })
  const parents = jsonified.map(row => row.parentId)
  const children = jsonified.map(row => row.childId)
  return [parents, children]
}

module.exports = findDescendents
module.exports.parseCSV = parseCSV

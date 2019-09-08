/*
 * Recursively constructs a list of all descendents of a particular node.
 * This solution exploits the pairwise string representation of the models,
 * going one layer down at each recursion until it can find no more children
 */
const findDescendents = (node, parentArray, childArray, nodesFound = []) => {
  console.log(node)
  const children = parentArray
    .map((parent, index) => index)
    .filter(index => parentArray[index] === node)
    .map(index => childArray[index])
    .filter(child => nodesFound.indexOf(child) === -1)

  const found = [...nodesFound, ...children]

  if (children.length === 0) {
    return node
  } else if (children.length === 1) {
    // This clause avoids prepending single child nodes with themselves, e.g. ['H', 'H']
    return children.map(child => findDescendents(child, parentArray, childArray, found))[0]
  } else {
    return [...children, ...children.map(child => findDescendents(child, parentArray, childArray, found))]
  }
}

const splitCSVToChildrenParents = (csv) => {
  const getColumn = n => csv.map(str => str.split(',')[n])
  const parents = getColumn(0)
  const children = getColumn(1)
  return [parents, children]
}

module.exports.findDescendents = findDescendents
module.exports.splitCSVToChildrenParents = splitCSVToChildrenParents

/*
 * Recursively constructs a list of all descendents of a particular node.
 *
 * @param {String} nodeId
 * @param {Array} nodePairs, expects form [{ parentId: String, childId: String }]
 */
const findDescendents = (nodeId, nodePairs) => {
  const parentNodes = nodePairs.filter(row => row.parentId === nodeId)
  const children = parentNodes.map(parent => parent.childId)

  if (children.length > 0) {
    return [...children, ...children.map(child => findDescendents(child, nodePairs)).flat()]
  }
  return nodeId
}

module.exports = findDescendents

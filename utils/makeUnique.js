/*
 * Takes an array and returns a new array with only unique elements
 */
module.exports = (array) => {
  return Array.from(new Set(array))
}

const mongoose = require('mongoose')

const childParentPairSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  parentId: String,
  childId: String,
  modelId: mongoose.SchemaTypes.ObjectId
})

const ChildParentPair = mongoose.model('ChildParentPair', childParentPairSchema)

const dataModelSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  childParentPairs: [childParentPairSchema]
})

dataModelSchema.methods.addNode = async function (parentId, childId) {
  const modelId = this._id
  const pair = new ChildParentPair({
    parentId, childId, modelId
  })

  return new Promise((resolve, reject) => {
    pair.save()
      .then(doc => {
        resolve(doc)
      })
      .catch(reject)
  })
}

dataModelSchema.methods.addManyNodes = async function (nodePairs) {
  return Promise.all(
    nodePairs.map(async pair => this.addNode(pair.parentId, pair.childId))
  )
}

dataModelSchema.methods.findDescendants = async function (node, found = []) {
  const nodes = await this.model('ChildParentPair')
    .find({ parentId: { $eq: node, $nin: found }, modelId: this._id })

  const parents = nodes.map(n => n.parentId)
  const children = nodes.map(n => n.childId)

  if (children.length > 0) {
    const recursivelyFoundDescendants = await Promise.all(
      children.map(async child => this.findDescendants(child, [...found, ...parents]))
    )
    return [...children, ...recursivelyFoundDescendants].flat()
  }

  return node
}

const DataModel = mongoose.model('DataModel', dataModelSchema)
module.exports = DataModel

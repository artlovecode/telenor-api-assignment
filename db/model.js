const mongoose = require("mongoose")

const childParentPairSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  parentId: String,
  childId: String
})

const dataModelSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  model: [childParentPairSchema]
})

const DataModel = mongoose.model("DataModel", dataModelSchema)
module.exports = DataModel


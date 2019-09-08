const mongoose = require("mongoose")

const dataModelSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  model: {
    type: String,
    validate: {
      validator(model) {
        return model.split("\n").every(str => /\w+,\w+/.test(str))
      }
    }
  },
})

const DataModel = mongoose.model("DataModel", dataModelSchema)
module.exports = DataModel


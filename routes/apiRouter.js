const express = require('express')
const apiRouter = express()
const bodyParser = require('body-parser')
const csv = require('csvtojson')

const DataModel = require('../db/model.js')
const findDescendents = require('../utils/findDescendents')
const makeUnique = require('../utils/makeUnique')

apiRouter.use(bodyParser.text({ extended: false, type: 'text/csv' }))

apiRouter.post('/seed', async (req, res, next) => {
  try {
    const csvRows = await csv().fromString(req.body)
    const entry = new DataModel({
      model: csvRows
    })

    entry.save((err) => {
      if (err) return next(err)
      res.send('successful operation')
    })
  } catch (e) {
    return next(e)
  }
})

apiRouter.get('/descendents/:unitId', async (req, res, next) => {
  try {
    const node = req.params.unitId
    const model = await DataModel.findOne().sort({ createdAt: -1 })

    const nodePairs = model.model

    const descendents = makeUnique(findDescendents(node, nodePairs))
    res.send(descendents)
  } catch (e) {
    return next(e)
  }
})
module.exports = apiRouter

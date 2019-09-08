const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost/test'

console.info(`Connecting to ${MONGO_URL}`)
mongoose.connect(MONGO_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', err => console.error(err))

const connectedToDb = new Promise((resolve) => {
  db.on('open', resolve)
})

module.exports.db = db
module.exports.connedtedToDb = connectedToDb

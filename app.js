const express = require('express')
const connectedToDb = require('./db/db.js').connedtedToDb
const apiRouter = require('./routes/apiRouter.js')

const app = express()
const PORT = process.env.PORT ? process.env.PORT : 8080
const HOST = process.env.HOST ? process.env.HOST : 'localhost'

app.use(apiRouter)

app.listen(PORT, async () => {
  await connectedToDb
  console.log(`API listening ${HOST}:${PORT}`)
})

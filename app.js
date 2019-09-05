const express = require('express')
const connectedToDb = require('./db/db.js').connedtedToDb


const app = express()
const PORT = process.env.PORT ? process.env.PORT : 8080
const HOST = process.env.HOST ? process.env.HOST :'localhost'


app.get('*', (req, res, next) => res.send('ayy'))
app.listen(PORT, async () => {
  await connectedToDb
  console.log(`API listening ${HOST}:${PORT}`)
})

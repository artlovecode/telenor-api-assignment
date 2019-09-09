const request = require('supertest')
const fs = require('fs')
const path = require('path')
const apiRouter = require('./apiRouter.js')
const connectedToDb = require('../db/db.js').connedtedToDb
const parseCSV = require('../utils/findDescendents').parseCSV


const testCsv = fs.readFileSync(path.resolve(__dirname, '..', 'data.csv')).toString()

beforeAll(async () => {
  await connectedToDb
})

test('should succeed in posting new seed', (done) => {
  return request(apiRouter)
    .post('/seed')
    .send(testCsv)
    .set('Content-Type', 'text/csv')
    .expect('successful operation')
    .end(done)
})

test('should get descendents', (done) => {
  return request(apiRouter)
    .get('/descendents/C')
    .send()
    .expect('["E","F","H","I"]')
    .end(done)
})

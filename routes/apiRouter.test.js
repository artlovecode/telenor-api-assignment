const request = require('supertest')
const fs = require('fs')
const path = require('path')

const apiRouter = require('./apiRouter.js')
const connectedToDb = require('../db/db.js').connedtedToDb
const DataModel = require('../db/model.js')
const ChildParentPair = require('../db/model.js').ChildParentPair

const testCsv = fs.readFileSync(path.resolve(__dirname, '..', 'data.csv')).toString()

beforeAll(async () => {
  await connectedToDb
})

afterAll(async () => {
  const deleteAllModels = new Promise((resolve, reject) => {
    DataModel.deleteMany({}, {}, (err) => {
      if (err) throw err
      console.log('deleted all models after testing')
      resolve()
    })
  })
  await deleteAllModels
  await ChildParentPair.deleteMany({}, {})
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
    .get('/descendants/C')
    .send()
    .expect('["E","F","H","I"]')
    .end(done)
})

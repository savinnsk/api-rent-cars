
import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/helpers/mongo-helper'

describe("Signup Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('users')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'savio',
        username: "savinnsk",
        email: 'savio@mail.com',
        password: 'savio123',
        driver_license: '123'

      })
      .expect(200)
  })
})

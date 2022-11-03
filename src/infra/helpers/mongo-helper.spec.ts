
import { MongoHelper as sut } from "./mongo-helper"

describe("MongoHelper", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test("should reconnect MongoDb if down", async () => {
    let accountCollection = await sut.getCollection("users")
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection("users")
    expect(accountCollection).toBeTruthy()
  })
})

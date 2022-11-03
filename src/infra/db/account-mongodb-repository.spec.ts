
import { MongoHelper } from "../helpers/mongo-helper"
import { AccountMongoRepository } from "./account-mongodb-repository"

describe("Account Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("users")
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test("Should return an account on success", async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: "valid_name",
      username: "valid_username",
      password: "valid_password",
      email: "valid_mail@mail.com",
      driver_license: "valid_driver_license"
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe("valid_name")
    expect(account.password).toBe("valid_password")
    expect(account.username).toBe("valid_username")
    expect(account.email).toBe("valid_mail@mail.com")
    expect(account.driver_license).toBe("valid_driver_license")
  })
})

import { AddAccountRepository } from "../../data/protocols/add-account-repository-protocols"
import { UserModel } from "../../domain/models/user"
import { AddAccountUserDTO } from "../../domain/usecases/add-account-protocols"
import { MongoHelper } from "../helpers/mongo-helper"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountUserDTO): Promise<UserModel> {
    const accountCollection = await MongoHelper.getCollection("users")
    const createAccount = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: createAccount.insertedId })
    return MongoHelper.map(account)
  }
}

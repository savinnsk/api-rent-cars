import { UserModel } from "../../domain/models/user"
import { AddAccountUserDTO } from "../../domain/usecases/add-account-protocols"
import { AddAccountRepository } from "../protocols/add-account-repository-protocols"
import { Encrypt } from "../protocols/encrypt-protocols"
import { AddAccountUseCase } from "./add-account-usecase"

interface SutTypes {
  addAccountRepositoryStub: AddAccountRepository
  encryptStub: Encrypt
  sut: AddAccountUseCase
}

const makeFakeAccountDTO = (): AddAccountUserDTO => ({
  name: "valid_name",
  username: "valid_username",
  password: "valid_password",
  email: "valid_mail@mail.com",
  driver_license: "valid_license_driver"
})

const makeFakeAccount = (): UserModel => ({
  id: "valid_id",
  name: "valid_name",
  username: "valid_username",
  password: "valid_password",
  email: "valid_mail@mail.com",
  driver_license: "valid_license_driver"
})

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountUserDTO): Promise<UserModel> {
      return await new Promise(resolve => (resolve(makeFakeAccount()))
      )
    }
  }

  return new AddAccountRepositoryStub()
}

const makeFakeEncrypt = (): Encrypt => {
  class EncryptStub implements Encrypt {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve("hashed_password"))
    }
  }

  return new EncryptStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const encryptStub = makeFakeEncrypt()
  const sut = new AddAccountUseCase(encryptStub, addAccountRepositoryStub)

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
  }
}

describe(("AddAccount UseCase"), () => {
  test("should call encrypt with correct password", async () => {
    const { encryptStub, sut } = makeSut()

    const encryptSpy = jest.spyOn(encryptStub, "encrypt")

    await sut.add(makeFakeAccountDTO())

    expect(encryptSpy).toHaveBeenLastCalledWith("valid_password")
  })
})

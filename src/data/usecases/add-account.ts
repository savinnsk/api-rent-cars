import { UserModel } from "../../domain/models/user"
import { AddAccount, AddAccountUserDTO } from "../../domain/usecases/add-account"
import { AddAccountRepository } from "../protocols/add-account-repository-protocols"
import { Encrypt } from "../protocols/encrypter-protocols"

export class AddAccountUseCase implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository
  private readonly encrypt: Encrypt

  constructor (encrypt: Encrypt, addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository
    this.encrypt = encrypt
  }

  async add (accountDTO: AddAccountUserDTO): Promise<UserModel> {
    const hashedPassword = await this.encrypt.encrypt(accountDTO.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountDTO, { password: hashedPassword }))
    return account
  }
}

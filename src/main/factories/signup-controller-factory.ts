import { AddAccountUseCase } from "../../data/usecases/add-account-usecase"
import { BcryptAdapter } from "../../infra/criptography/bcrypt.adapter"
import { AccountMongoRepository } from "../../infra/db/account-mongodb-repository"
import { SignupController } from "../../presentation/controllers/signup-controller"
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter"

export const makeSignupController = (): SignupController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const bcrypt = new BcryptAdapter(salt)
  const addAccount = new AddAccountUseCase(bcrypt, addAccountRepository)
  return new SignupController(emailValidator, addAccount)
}

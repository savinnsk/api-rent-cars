import { UserModel } from "../../domain/models/user"
import { AddAccount, AddAccountUserDTO } from "../../domain/usecases/add-account-protocols"
import { InvalidParamsError } from "../errors/invalid-params-error"
import { MissingParamsError } from "../errors/missing-params-error"
import { ServerError } from "../errors/server-error"
import { badRequest, ok, serverError } from "../helpers/http.helper"
import { EmailValidator } from "../protocols/email-validator-protocols"
import { HttpRequest } from "../protocols/http-protocols"
// import { HttpRequest } from "../protocols/http-protocols"
import { SignupController } from "./signup-controller"

interface sutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "valid_name",
    username: "valid_username",
    password: "valid_password",
    email: "valid_mail@mail.com",
    driver_license: "valid_driver_license"
  }
})

const makeFakeAccount = (): UserModel => ({
  id: "valid_id",
  name: "valid_name",
  username: "valid_username",
  password: "valid_password",
  email: "valid_mail@mail.com",
  driver_license: "valid_driver_license"
})

const makeFakeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountUserDTO): Promise<AddAccountUserDTO> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): sutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const addAccountStub = makeFakeAddAccountStub()
  const sut = new SignupController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe("signupController", () => {
  test("should return 400 if no name provider", async () => {
    const { sut } = makeSut()

    const HttpRequest = {
      body: {
        username: "valid_username",
        password: "valid_password",
        email: "valid_mail@mail.com",
        driver_license: "valid_driver_license"
      }
    }

    const httpResponse = await sut.handle(HttpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamsError("name")))
  })

  test("should return 400 if no username provider", async () => {
    const { sut } = makeSut()

    const HttpRequest = {
      body: {
        name: "valid_name",
        password: "valid_password",
        email: "valid_mail@mail.com",
        driver_license: "valid_driver_license"
      }
    }

    const httpResponse = await sut.handle(HttpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamsError("username")))
  })

  test("should return 400 if no password provider", async () => {
    const { sut } = makeSut()

    const HttpRequest = {
      body: {
        name: "valid_name",
        username: "valid_username",
        email: "valid_mail@mail.com",
        driver_license: "valid_driver_license"
      }
    }

    const httpResponse = await sut.handle(HttpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamsError("password")))
  })

  test("should return 400 if no driver license provider", async () => {
    const { sut } = makeSut()

    const HttpRequest = {
      body: {
        name: "valid_name",
        username: "valid_username",
        password: "valid_password",
        email: "valid_mail@mail.com"
      }
    }

    const httpResponse = await sut.handle(HttpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamsError("driver_license")))
  })

  test("should 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: "valid_name",
        username: "valid_username",
        password: "valid_password",
        email: "invalid_mail@mail.com",
        driver_license: "valid_driver_license"
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamsError("email")))
  })

  test("should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailSpy = jest.spyOn(emailValidatorStub, "isValid")

    await sut.handle(makeFakeRequest())
    expect(emailSpy).toHaveBeenLastCalledWith("valid_mail@mail.com")
  })

  test('should return 500 if emailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error(null)
    })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test("should return 200 if valid data provider", async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test("should return 500 if add Account throws", async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})

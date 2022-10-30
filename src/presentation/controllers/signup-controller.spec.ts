import { MissingParamsError } from "../errors/missing-params-error"
import { badRequest } from "../helpers/http.helper"
import { EmailValidator } from "../protocols/email-validator-protocols"
import { SignupController } from "./signup-controller"

interface sutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return false
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): sutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new SignupController(emailValidatorStub)

  return {
    emailValidatorStub,
    sut
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
})

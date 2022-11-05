import { EmailValidator } from "../presentation/protocols/email-validator-protocols"
import validator from "validator"

const makeSut = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return validator.isEmail(email)
    }
  }
  return new EmailValidatorStub()
}

describe("Email Validator", () => {
  test("should return a boolean if email is valid ", () => {
    const sut = makeSut()
    const fakeEmail = "valid_mail@mail.com"
    const response = sut.isValid(fakeEmail)

    expect(response).toBe(true)
  })
})

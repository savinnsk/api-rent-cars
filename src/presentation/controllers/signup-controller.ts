import { MissingParamsError } from "../errors/missing-params-error"
import { badRequest, ok, serverError } from "../helpers/http.helper"
import { Controller } from "../protocols/controllers-protocols"
import { EmailValidator } from "../protocols/email-validator-protocols"
import { HttpRequest, HttpResponse } from "../protocols/http-protocols"

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', "username", 'email', 'password', 'driver_license']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      const { email, ...account } = await httpRequest.body
      this.emailValidator.isValid(email)

      return ok(account)
    } catch (error) {
      serverError(error)
    }
  }
}

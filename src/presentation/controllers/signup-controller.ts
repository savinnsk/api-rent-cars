import { AddAccount } from "../../domain/usecases/add-account-protocols"
import { InvalidParamsError } from "../errors/invalid-params-error"
import { MissingParamsError } from "../errors/missing-params-error"
import { badRequest, ok, serverError } from "../helpers/http.helper"
import { Controller } from "../protocols/controllers-protocols"
import { EmailValidator } from "../protocols/email-validator-protocols"
import { HttpRequest, HttpResponse } from "../protocols/http-protocols"

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', "username", 'email', 'password', 'driver_license']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { name, username, email, password, driver_license } = await httpRequest.body
      const account = await this.addAccount.add({ name, username, email, password, driver_license })

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamsError("email"))
      }

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

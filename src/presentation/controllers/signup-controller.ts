import { MissingParamsError } from "../errors/missing-params-error"
import { badRequest, ok, serverError } from "../helpers/http.helper"
import { Controller } from "../protocols/controllers"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignupController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', "username", 'email', 'password', 'driver_license']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      const account = await httpRequest.body

      return ok(account)
    } catch (error) {
      serverError(error)
    }
  }
}

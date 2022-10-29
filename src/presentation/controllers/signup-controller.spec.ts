import { MissingParamsError } from "../errors/missing-params-error"
import { badRequest } from "../helpers/http.helper"
import { SignupController } from "./signup-controller"

const makeSut = (): SignupController => {
  return new SignupController()
}

describe("signupController", () => {
  test("should return 400 if no name provider", async () => {
    const sut = makeSut()

    const HttpRequest = {
      body: {
        username: "valid_username",
        password: "valid_password",
        email: "valid_email",
        driver_license: "valid_driver_license"
      }
    }

    const httpResponse = await sut.handle(HttpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamsError("name")))
  })
})


import { BcryptAdapter } from "./bcrypt.adapter"

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe("Encrypt password", () => {
  test("should call encrypt with correct values", async () => {
    const sut = makeSut()
    const encryptSpy = jest.spyOn(sut, "encrypt")
    await sut.encrypt("any_value")

    expect(encryptSpy).toHaveBeenCalledWith("any_value")
  })
})

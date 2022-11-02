
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

  test("should return a hash on success", async () => {
    const sut = makeSut()

    const hash = await sut.encrypt("any_value")

    expect(hash).toBe(hash)
  })
})

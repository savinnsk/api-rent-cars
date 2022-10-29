export class MissingParamsError extends Error {
  constructor (missedParam: string) {
    super(`Missing param ${missedParam}`)
    this.name = "MissingParamError"
  }
}

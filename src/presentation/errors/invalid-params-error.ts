export class InvalidParamsError extends Error {
  constructor (invalidParam: string) {
    super(`Invalid Param ${invalidParam}`)
    this.name = "invalid params error"
  }
}

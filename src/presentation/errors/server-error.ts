export class ServerError extends Error {
  constructor (stack: any) {
    super("Internal Server Error")
    this.name = "Server Error"
    this.stack = stack
  }
}

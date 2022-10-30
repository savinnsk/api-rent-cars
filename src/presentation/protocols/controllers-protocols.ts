import { HttpRequest, HttpResponse } from "./http-protocols"

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}

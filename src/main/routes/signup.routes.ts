import { Router } from "express"
import { adapterRouter } from "../adapters/express-route-adapter"
import { makeSignupController } from "../factories/signup-controller-factory"

export default (router: Router): void => {
  router.post("/signup", adapterRouter(makeSignupController()))
}

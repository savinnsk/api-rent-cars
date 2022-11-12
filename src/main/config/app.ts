import express from "express"
import setupMiddlewares from "../config/middlewares"
import setupRoutes from "../config/routes"
import setupSwagger from "./config-swagger"

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app

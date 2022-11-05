import { MongoHelper } from "../infra/db/helpers/mongo-helper"
import env from "./config/env"

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import ("./config/app")).default
    app.listen(env.port, () => console.log(`Server is running at ${env.port}`))
  })

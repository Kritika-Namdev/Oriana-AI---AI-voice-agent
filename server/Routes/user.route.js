import express from "express"
import { isAuth } from "../Middleware/isAuth.js"
import { getCurrectUser, saveAssistant } from "../Controllers/user.controller.js"

const userRouter = express.Router()


userRouter.get("/current-user", isAuth, getCurrectUser)

userRouter.post("/save-assistant" , isAuth , saveAssistant)

export default userRouter




import express from 'express'

import {logOut,login,signUp} from '../controller/authController.js'

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)

export default authRouter
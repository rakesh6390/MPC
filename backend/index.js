import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
dotenv.config()
import cors from 'cors'
import userRouter from './route/userRoute.js'
import courseRouter from './route/courseRoute.js'

const port=process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

 connectDb()

 app.use("/api/auth",authRouter)
 app.use("/api/user",userRouter)
 app.use("/api/course",courseRouter)


app.get("/",(req,res)=>{
    res.send("hello from server")
})

app.listen(port,()=>{
    console.log("server started at 3000")
})
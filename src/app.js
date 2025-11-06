import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from './modules/users/user.routes.js'

const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use('/api/users',userRouter)

app.get('/',(req,res)=>{
  res.send('welcome to furniture api')
})

export default app
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { questionRouter } from './Routes/questionsRoute.js'
import { userRouter } from './Routes/userRoute.js'
import { companiesRouter } from './Routes/companiesRoute.js'

dotenv.config()

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.status(200).json({message:"Hello there"})
})

app.use('/api/questions',questionRouter)
app.use('/api/users',userRouter)
app.use('/api/companies',companiesRouter)

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error.message);
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB Disconnected");
})

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server is listening");
})
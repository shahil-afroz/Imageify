import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import imageRouter from './routes/imageRoutes.js'
import connectdb  from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
const PORT=process.env.PORT||4000
const app=express();

app.use(express.json());
app.use(cors());
await connectdb()


app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/',(req,res)=>res.send("API WORKINg"));

app.listen(PORT,()=>console.log('Server running on port '+ PORT))
import mongoose from "mongoose";


const connectdb=async()=>{

    mongoose.connection.on('connected',()=>{
        console.log("DataBase Connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}
export default connectdb;
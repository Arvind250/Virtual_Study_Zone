import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';


const connectDB = async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connected succesfully")
        
    } catch (error) {
        console.log("ERROR connecting to DB :", error)
        throw error
    }
}

export default connectDB
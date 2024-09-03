const mongoose = require('mongoose')
const DB_NAME = require('constants')

const connectDB = async() => {
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`MongoDB connected !! DB Host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.error("MongoDB connection Failed: ", error)
        process.exit(1)
    }
}

module.exports = {connectDB}
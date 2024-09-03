require('dotenv').config({path: './.env'})
const { connectDB } = require('./db/db.js')
const {app} = require('./app.js');


connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on port : ${process.env.PORT}`);
    })    
})
.catch((error) => {
    console.log("MongoDB connection failed !! ", error)
})








           //if we want to import rather then require
// import dotenv from "dotenv"
// dotenv.config({
//     path: '/env'
// })

// ;(async() => {
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     }
//     catch(error){
//         console.error("Error: ", error)
//         throw error
//     }
// })()
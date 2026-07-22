require("dotenv").config()
const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI,)
    .then(()=>{
        console.log("Database connected successfully")
     })
     .catch(err=>{
        console.log("error in connecting to database")
        process.exit(1)

    })

}
module.exports = connectDB
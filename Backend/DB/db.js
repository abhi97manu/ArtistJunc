const mongoose = require('mongoose')

const connectDB =()=>{
    
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("Connected to Database!")
        })
        .catch((error)=>{
            console.log("error Occured: ", error)
        })
        
    
    
} 


module.exports = connectDB;
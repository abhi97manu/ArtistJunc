const mongoose = require('mongoose')

const connectDB =()=>{
    
        mongoose.connect('mongodb://localhost:27017/ArtSongs')
        .then(()=>{
            console.log("Connected to Database!")
        })
        .catch((error)=>{
            console.log("error Occured: ", error)
        })
        
    
    
} 


module.exports = connectDB;
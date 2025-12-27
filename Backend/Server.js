require('dotenv').config()
const app = require('./MainApp')
const connectDB = require('./DB/db')
const cors = require('cors');



connectDB();
app.listen("3000", ()=>{
    console.log("Listening to the port now!");
    
})

console.log(process.env.IMAGEKIT_PUBLIC_KEY)
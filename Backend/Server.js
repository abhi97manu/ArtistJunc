require('dotenv').config()
const app = require('./MainApp')
const connectDB = require('./DB/db')




connectDB();
app.listen(process.env.SERVER_PORT, ()=>{
    console.log("Listening to the port now!");
    
})

console.log(process.env.IMAGEKIT_PUBLIC_KEY)
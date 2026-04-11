const mongoose = require("mongoose");
const Genre = require("../Modal/genre.modal");
const dotenv = require('dotenv');
dotenv.config();
console.log("Mongo URL: ", process.env.MONGO_URL)
const connectDB = async()=>{
    
        await mongoose.connect(process.env.MONGO_URL )
        .then(()=>{
            console.log("Connected to Database! Running Seed Script")
        })
        .catch((error)=>{
            console.log("error Occured: ", error)
        })
        
    
    
} 

 const seedGenres = async () => {
    console.log("Seeding Genres...")
        await Genre.insertMany([
        { name: "Pop" },
        { name: "Rock" },
        { name: "Jazz" },
        { name: "Hip-Hop" },
        { name: "Classical" },
        { name: "Electronic" },
        ])

        console.log("Genres Seeded Successfully!")

}
connectDB();
seedGenres();

return
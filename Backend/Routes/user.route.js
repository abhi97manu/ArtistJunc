const express = require("express");
const mongoose = require("mongoose")
const userRouter = express.Router();
const userModal = require("../Modal/user_modal");
const jwt = require("jsonwebtoken");
const songModal = require("../Modal/Song_modal");
const albumModal = require("../Modal/Album_modal")
const multer = require("multer");
const { uploadImageToI_KIT } = require("../Services/Song.services");


const upload = multer({ storage: multer.memoryStorage() }); 


userRouter.post("/login", async (req, res) => {
  {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email: email });

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
      });
      password === user.password
        ? res.status(200).json({ message: "Login Sucessfull" })
        : res.status(401).json({ message: "Invalid Credentials" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

userRouter.get("/profile", async (req, res) => {
  const { token } = req.cookies;
 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await userModal.findById(decoded_token.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ email: user.email });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({ message: "Logged out successfully" });
});

userRouter.delete("/delete_song/:id", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const song = req.params.id;
  const deltedSong = await userModal.findOneAndUpdate(
    { _id: jwt.verify(token, process.env.JWT_SECRET_KEY).id },
    {
      $pull: { songs: song },
    }
  );
  if (!deltedSong) {
    return res.status(404).json({ message: "Song not found" });
  }
  res.json({ message: "Song deleted successfully" });
});

userRouter.get("/userSongs", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const data = await userModal
    .findById({ _id: jwt.verify(token, process.env.JWT_SECRET_KEY).id })
    .populate("songs");
  res.json(data.songs);
});

userRouter.get("/albums",async (req, res) => {

    const {token} = req.cookies
    if(!token)
    {
      res.json({message : "User not Auth!"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(typeof(decoded.id));
    
    const content =  await albumModal.aggregate([
      {
        $match : {artist_id :  new mongoose.Types.ObjectId(decoded.id) }
      },
      {
        $lookup: {
          from : "songs",
          localField: "Songs",
          foreignField: "_id",
          as : "songs"
        }
      },
      {
        $project : {
          albumName :1 ,
          albumImg:1,
          createdAt:1,
          songs :{
            _id:1,
            Title: 1,
            AudioFile:1,
            ImageFile:1

          }

        }
      }
    ])


   console.log(content);
   
      
  
    
   res.status(200).send(content)
  })

userRouter.post("/albums", upload.single("AlbumImg"),async(req,res)=>{
      console.log(req.body);
      console.log(req.file)
    const token = req.cookies.token
    if(!token)
    {
      res.json({message: "not Authorized"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

    try{

      const AlbumImage = await uploadImageToI_KIT(req.file.buffer)
    console.log(req.body.AlbumSongs);
    
      const album = await albumModal.create({
        artist_id : decoded.id,
        albumName : req.body.Title,
        Songs : req.body.AlbumSongs,
        albumImg : AlbumImage.url
      })

      if(!album)
      {
        res.status(401).json({message:"something went wrong with Album DB" })
          console.log("something went wrong with Album DB");
          
      }
      res.status(200).json({mesage: "sucess"})
    }
    catch(err)
    {
        console.log("Err", err);
        
    }
   })
  
module.exports = userRouter;

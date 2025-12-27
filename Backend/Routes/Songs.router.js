const express = require("express");
const multer = require("multer");
const uploadSongToI_KIT = require("../Services/Song.services");
const uploadImageToI_KIT = require("../Services/Song.services");
const router = express.Router();
const songsModal = require("../Modal/Song_modal");
const storage = multer({ storage: multer.memoryStorage() });
const userModal = require("../Modal/user_modal");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { log } = require("three");


router.use(cors({
   origin: "http://localhost:5173",
   credentials: true,
}));
router.use(cookieParser()); 

router.get("/admin", (req, res) => {
  res.send({
    message: "hey admin",
  });
});

router.post(
  "/upload_song",
  storage.fields([{ name: "ImgCover" }, { name: "SongFile" }]),
  async (req, res) => {
    console.log(req.files.SongFile);
    console.log(req.body);
    const {token} = req.cookies
    const imageFileData = await uploadImageToI_KIT(req.files.ImgCover);
    const songFileData = await uploadSongToI_KIT(req.files.SongFile);

    const songs = await songsModal.create({
      Title: req.body.Title,
      AlbumName: req.body.AlbumName,
      Type: req.body.Type,
      Feat: req.body.Feat,
      AudioFile: songFileData.url,
      ImageFile: imageFileData.url,
    });

    console.log(songs._id);
    const user = await userModal.findOneAndUpdate({_id: jwt.verify(token,process.env.JWT_SECRET_KEY).id},{
      $push: { songs: songs._id }
    })
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    console.log("user found and updated ", user);
    

    res.json({
      message: "created Sucessfully!",
      data: songs,
      user: user,
    });
  }
);

router.get("/albums", async (req, res) => {
  const data = await songsModal.find({ Type: "Album" });
  const albumData = {};
  for (ele of data) {
    albumData[ele.AlbumName] = data;
  }
  console.log(albumData);

  res.send(albumData);
});

router.get("/userSongs", async (req, res) => {
  const data = await songsModal.find();
  res.json(data);
});

















router.post("/login", async (req, res) => {
  {
    const {email,password} = req.body;
    const user = await userModal.findOne({email:email})
      
    if(user){   
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY)
        res.cookie("token",token,{
          httpOnly:true,
        })
        password === user.password?res.status(200).json({message: "Login Sucessfull"})
        :res.status(401).json({message: "Invalid Credentials"});
    }
    else{
        res.status(404).json({message: "User not found"});
    }
    
  }
});



router.get("/profile", async(req,res)=>{

    const {token} = req.cookies
  console.log(token);
  
    if(!token){
      return res.status(401).json({message:"Unauthorized"})
    }
    
    const decoded_token = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await userModal.findById(decoded_token.id)
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.json({email:user.email})
})

router.post("/logout",(req,res)=>{
  
  
    res.clearCookie('token',{ httpOnly: true,
})
    res.json({message:"Logged out successfully"})
})

module.exports = router;

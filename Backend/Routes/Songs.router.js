const express = require("express");
const multer = require("multer");
const { uploadImageToI_KIT, uploadSongToI_KIT } = require("../Services/Song.services");
const router = express.Router();
const songsModal = require("../Modal/Song_modal");
const storage = multer({ storage: multer.memoryStorage() });
const userModal = require("../Modal/user_modal");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { log } = require("three");
const { useSyncExternalStore } = require("react");



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
  
   
    const {token} = req.cookies
    const imageFileData = await uploadImageToI_KIT(req.files.ImgCover[0].buffer);
    const songFileData = await uploadSongToI_KIT(req.files.SongFile);

     console.log(imageFileData, "::", songFileData);

    const songs = await songsModal.create({
      Title: req.body.Title,
      AlbumName: req.body.AlbumName,
      Type: req.body.Type,
      Feat: req.body.Feat,
      AudioFile: songFileData.url,
      ImageFile: imageFileData.url,
    });

   
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

router.get("/getSong/:id?", async (req, res) => {

   try{
      const data = await songsModal.findOne({
        _id: req.params.id 
      })
      if(!data)
      {
        console.log("uunable to fetch from DB")
      }
      console.log(data);
      res.status(200).json({message: "success", data: data})
      
   }
   catch(err)
   {
      console.log(err);
      
   }
   
      
  //   console.log(Album);
    
  //  res.send(Album)

  // const data = await songsModal.find({ Type: "Album" });
  // const albumData = {};
  // for (const ele of data) {
  //   if(!albumData[ele.AlbumName])
  //     albumData[ele.AlbumName] = []
  //   albumData[ele.AlbumName].push(data);
  // }
 
  // console.log(albumData);
  
  // res.send(albumData);
});

router.get("/getAllSongs/:id", async(req,res)=>{
  console.log(req.params.id);
  console.log(req.query);
  
  
      try{
          const data = await songsModal.aggregate([{
            $match : {
              Type: req.params.id
            }
          }])

          console.log(data);
          res.status(200).json({message : "success", Songs: data})
          
      }catch(err)
      {
        console.log(err, "error getting list of all songs");
        res.status(400).json({message : "Faulty"})
        
      }
})




















module.exports = router;

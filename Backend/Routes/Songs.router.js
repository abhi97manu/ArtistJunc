const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const {
  uploadImageToI_KIT,
  uploadSongToI_KIT,
} = require("../Services/Song.services");
const router = express.Router();
const songsModal = require("../Modal/Song_modal");
const storage = multer({ storage: multer.memoryStorage() });
const albumModal = require("../Modal/Album_modal");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());


router.post(
  "/upload_song",
  storage.fields([{ name: "ImgCover" }, { name: "SongFile" }]),
  async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const artistId = jwt.verify(token, process.env.JWT_SECRET_KEY).id;
      const imageFileData = await uploadImageToI_KIT(
        req.files.ImgCover[0].buffer
      );
      const songFileData = await uploadSongToI_KIT(req.files.SongFile);

      // console.log(imageFileData, "::", songFileData);

      const songs = await songsModal.create({
        Title: req.body.Title,
        AlbumName: req.body.AlbumName,
        Type: req.body.Type,
        Feat: req.body.Feat,
        AudioFile: songFileData.url,
        ImageFile: imageFileData.url,
        Artist_id: artistId,
      });

      res.json({
        message: "created Sucessfully!",
        data: songs,
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Error while uploading" });
    }
   
  }
);

router.get("/songs/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const artistId = jwt.verify(token, process.env.JWT_SECRET_KEY).id;
    const songs = await songsModal.find({ Artist_id: artistId }).sort({
      createdAt: -1,
    });

    return res.json(songs);
  } catch (err) {
    console.log("error while receiving songs", err);
    return res.status(500).send({ message: "Error while receiving Songs" });
  }
});

router.get("/getSong/:id", async (req, res) => {
//  console.log("issue here ?? ", req.params.id);

  try {
    const data = await songsModal.findById(req.params.id);
    if (!data) {
      console.log("uunable to fetch from DB");
    }
    // console.log(data);
    res.status(200).json({ message: "success", data: data });
  } catch (err) {
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

router.get("/getAllSongs/:artistId", async (req, res) => {
  const { artistId } = req.params;
  const { page = 0, limit = 10, type = "Single" } = req.query;
  const skip = Number(page) * Number(limit);

  try {
    const matchStage = {
      Artist_id: new mongoose.Types.ObjectId(artistId),
    };

    if (type) {
      matchStage.Type = type;
    }

    const data = await songsModal.aggregate([
      {
        $match: matchStage,
      },
      {
        $facet: {
          data: [
            {
              $sort: { createdAt: -1 },
            },
            {
              $skip: skip,
            },
            {
              $limit: Number(limit),
            },
          ],
          totalRec: [
            {
              $count : "count"
            }
          ]
        },
      },
    ]);

    res.status(200).json({ message: "success", Songs: data[0].data, count : data[0].totalRec[0]?.count});
  } catch (err) {
    console.log(err, "error getting list of all songs");
    res.status(400).json({ message: "Faulty" });
  }
});

router.get("/getRecentSong",async (req,res)=>{
 
  try{
      const query = {};

      if (req.query.artistId) {
        query.Artist_id = req.query.artistId;
      }

      const data = await songsModal.findOne(query).sort({createdAt:-1})
  //     console.log(data);
       if(data)
        res.status(200).json(data)
       else
        res.status(404).json({ message: "No song found" })
  }
  catch(err){
      console.log(err);
      
  }
})

router.delete("/songs/:id", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const artistId = jwt.verify(token, process.env.JWT_SECRET_KEY).id;
    const songId = req.params.id;

    const deletedSong = await songsModal.findOneAndDelete({
      _id: songId,
      Artist_id: artistId,
    });

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    await albumModal.updateMany(
      { artist_id: artistId },
      { $pull: { Songs: deletedSong._id } }
    );

    return res.json({ message: "Song deleted successfully" });
  } catch (err) {
    console.log("error while deleting song", err);
    return res.status(500).send({ message: "Internal Error" });
  }
});

module.exports = router;

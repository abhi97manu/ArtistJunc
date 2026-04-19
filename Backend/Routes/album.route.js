const express = require("express");
const albumRouter = express.Router();
const mongoose = require("mongoose")
const AlbumModal = require("../Modal/Album_modal");

albumRouter.get("/allAlbums", async (req, res) => {
  try {
    const { artistId, limit, page = 0 } = req.query;
    const query = {};

    if (artistId) {
      query.artist_id = new mongoose.Types.ObjectId(artistId);
    }

    const pageLimit = Number(limit) || 0;
    const request = AlbumModal.find(query).sort({ createdAt: -1 });

    if (pageLimit > 0) {
      request.skip(Number(page) * pageLimit).limit(pageLimit);
    }

    const data = await request;

    if (!data) {
      console.log("no data in db");
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("DB error", err);
  }
});

albumRouter.get("/albumSong", async (req, res) => {
  try {
    const id = req.query.search;
    if (!id) res.json({ message: "no album found" });

    const data = await AlbumModal.aggregate([
      {
        $match: { _id:  new mongoose.Types.ObjectId(id)  },
      },
      {
        $lookup: {
          from: "songs",
          localField: "Songs",
          foreignField: "_id",
          as: "songs",
        }
     
      },
      {
           $project:{
            
          albumName:1,
            songs :{
            _id:1,
            Title: 1,
            AudioFile:1,
         

          }
        }
      }
    ]);
    res.status(200).json(data[0]??null)
  } catch (err) {
    console.log(err);
    
  }
});

module.exports = albumRouter;

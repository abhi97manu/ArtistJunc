const express = require("express");
const mongoose = require("mongoose");
const userModal = require("../Modal/user_modal");

const artistRouter = express.Router();

artistRouter.get("/", async (req, res) => {
  try {
    const artists = await userModal.aggregate([
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "Artist_id",
          as: "songs",
        },
      },
      {
        $lookup: {
          from: "albums",
          localField: "_id",
          foreignField: "artist_id",
          as: "albums",
        },
      },
      {
        $lookup: {
          from: "songs",
          let: { artistId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$Artist_id", "$$artistId"] },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            {
              $project: {
                Title: 1,
                ImageFile: 1,
                createdAt: 1,
              },
            },
          ],
          as: "latestSongs",
        },
      },
      {
        $project: {
          artistName: 1,
          stageName: 1,
          genre: 1,
          bio: 1,
          songCount: { $size: "$songs" },
          albumCount: { $size: "$albums" },
          latestSong: { $first: "$latestSongs" },
        },
      },
      {
        $sort: { stageName: 1, artistName: 1 },
      },
    ]);

    return res.status(200).json(artists);
  } catch (err) {
    console.log("error while fetching artists", err);
    return res.status(500).json({ message: "Unable to fetch artists" });
  }
});

artistRouter.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid artist id" });
    }

    const artist = await userModal
      .findById(req.params.id)
      .select("artistName stageName genre bio");

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    return res.status(200).json(artist);
  } catch (err) {
    console.log("error while fetching artist", err);
    return res.status(500).json({ message: "Unable to fetch artist" });
  }
});

module.exports = artistRouter;

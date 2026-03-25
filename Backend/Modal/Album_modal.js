const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    artist_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    albumName: String ,
    Songs: [{type: mongoose.Schema.Types.ObjectId, ref: "songs" ,required : true }],
    albumImg: String,
  },
  { timestamps: true }
);

const AlbumModal = mongoose.model("Albums", albumSchema);

module.exports = AlbumModal;

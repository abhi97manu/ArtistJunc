const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
    trim: true,
  },
  stageName: {
    type: String,
    trim: true,
  },
  genre: [{
    type: String,
    trim: true,
  }],
  bio: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  tours: [{ type: mongoose.Schema.Types.ObjectId, ref: "tours" }],
});

const userModal = mongoose.model("users", userSchema);
module.exports = userModal;

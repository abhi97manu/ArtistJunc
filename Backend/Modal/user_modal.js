const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    songs : [{ type: mongoose.Schema.Types.ObjectId, ref: 'songs' }]
})

const userModal = mongoose.model("users",userSchema);
module.exports = userModal;
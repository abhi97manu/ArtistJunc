const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    songs : [{ type: mongoose.Schema.Types.ObjectId, ref: 'songs' }],
    tours : [{type: mongoose.Schema.Types.ObjectId, ref: 'tours' }]
})

const userModal = mongoose.model("users",userSchema);
module.exports = userModal;
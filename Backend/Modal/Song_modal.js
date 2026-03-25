const mongoose = require('mongoose')


const songSchema = new mongoose.Schema({
    Title: String,
    Type : String,
    Feat : String,
    AlbumName: String,
    AudioFile : String,
    ImageFile : String,
    Artist_id : {type: mongoose.Schema.Types.ObjectId, ref: 'users', required : true}
},{timestamps:true})

const songModal = mongoose.model("songs",songSchema)
module.exports = songModal;
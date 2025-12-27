const mongoose = require('mongoose')


const songSchema = new mongoose.Schema({
    Title: String,
    Type : String,
    Feat : String,
    AlbumName: String,
    AudioFile : String,
    ImageFile : String
})

const songModal = mongoose.model("songs",songSchema)
module.exports = songModal;
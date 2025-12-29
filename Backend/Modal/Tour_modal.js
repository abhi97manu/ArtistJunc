
const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    artist_id : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    tourName : String,
    tourDate : Date,
    tourVenue : String,
    availability : {type: Boolean, default: true},
    tourPoster : String
})

const TourModal = mongoose.model("tours",TourSchema);

module.exports = TourModal;
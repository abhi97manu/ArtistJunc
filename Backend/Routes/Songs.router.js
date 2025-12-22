const express = require('express');
const multer = require('multer');
const uploadSongToI_KIT = require('../Services/Song.services')
const uploadImageToI_KIT = require('../Services/Song.services')
const router = express.Router();
const songsModal = require('../Modal/Song_modal')
const storage=multer({storage:multer.memoryStorage()});

router.get('/admin',(req,res)=>{
    res.send({
        message:"hey admin"
    })
})

router.post('/upload_song',storage.fields([{name: "ImgCover"}, {name:"SongFile"}]), async (req,res)=>{
    console.log(req.files.SongFile);
    console.log(req.body)

  const imageFileData = await uploadImageToI_KIT(req.files.ImgCover)
    const songFileData = await uploadSongToI_KIT(req.files.SongFile)

    const songs = await songsModal.create({
        Title: req.body.Title,
        Desc : req.body.Desc,
        Type : req.body.Type,
        Feat : req.body.Feat,
        AudioFile : songFileData.url,
        ImageFile : imageFileData.url


    })

    res.json({
        message: "created Sucessfully!",
        data : songs
    })
    
})


router.get('/userSongs', async (req,res)=>{
    const data = await songsModal.find();
    res.json(data)
    console.log(data);
    
})


module.exports = router
const express = require('express');
const tourModal = require('../Modal/Tour_modal');
const multer = require('multer');
const {uploadCoverToI_KIT} = require('../Services/Song.services');
const jwt =  	require('jsonwebtoken');
const tourRouter = express.Router();

const storage = multer({ storage: multer.memoryStorage() });

tourRouter.post('/createTour',storage.single('tourPoster') , async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    const { tourName, tourDate, tourVenue} = req.body;
   const tourPoster = req.file;
  
    console.log("tourPoster", req.file);
    const artist_id = jwt.verify(token, process.env.JWT_SECRET_KEY).id ?? null;
    const posterUrl = await uploadCoverToI_KIT(tourPoster);

    const newTour = await tourModal.create({
        artist : artist_id,
        tourName: tourName,
        tourDate: new Date(2023, 0, 22),
        tourVenue: tourVenue,
        tourPoster: posterUrl.url
    });
    if(!newTour){
        return res.status(500).json({message: "Error creating tour"});
    }
    res.json({message: "Tour created successfully", data: newTour});
}) 


tourRouter.get('/getTours', async(req,res)=>{
    const {token} = req.cookies;
    if(!token)
        res.json({message : "Unautorized"    })
    const tourData = await tourModal.find()
    if(!tourData)
    {
        res.json({message: "No Tours Available"})
    }
    res.status(200).json(tourData)
})

module.exports = tourRouter;
const express = require('express');
const tourModal = require('../Modal/Tour_modal');
const multer = require('multer');
const {uploadCoverToI_KIT} = require('../Services/Song.services');
const jwt =  	require('jsonwebtoken');
const userModal = require('../Modal/user_modal');
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
       
        tourName: tourName,
        tourDate: new Date(2023, 0, 22),
        tourVenue: tourVenue,
        tourPoster: posterUrl.url
    });
    if(!newTour){
        return res.status(500).json({message: "Error creating tour"});
    }
    res.json({message: "Tour created successfully", data: newTour});



     const user = await userModal.findByIdAndUpdate({_id: artist_id},
        {
            $push : {tours :newTour._id }
        }
    )

    if(!user) res.json({message : "user unable to link the tour"});
    
}) 


tourRouter.get('/getTours', async(req,res)=>{
    const {token} = req.cookies;
    if(!token)
        res.json({message : "Unautorized"    })
    const user = await userModal
    .findById({_id : jwt.verify(token , process.env.JWT_SECRET_KEY).id}).populate('tours')
    if(!user)
    {
        res.json({message: "No Tours Available"})
    }
    res.status(200).json(user.tours)

    console.log("tourData" , user.tours);
    
})





tourRouter.get('/getTour',async(req,res)=>{
    try{
        const tours= await tourModal.find()
        res.json(tours)
    }
    catch(err)
    {console.log("unable to fetch tour from db", err);
    }
})

module.exports = tourRouter;
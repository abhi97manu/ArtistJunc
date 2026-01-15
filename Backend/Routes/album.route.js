const express = require("express")
const albumRouter = express.Router()
const  AlbumModal = require('../Modal/Album_modal')

albumRouter.get('/allAlbums',async(req,res)=>{
    try{
        const data = await AlbumModal.find()
       
        if(!data)
        {
            console.log("no data in db");
            
        }
        res.status(200).json(data)
    }
    catch(err)
    {
        console.log("DB error", err)
    }

        
})



module.exports = albumRouter;
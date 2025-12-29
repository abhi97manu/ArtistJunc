
const imagekit = require('imagekit')
const mongoose = require('mongoose')



var iKit = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL
})





function uploadSongToI_KIT(file){
    console.log("🔥 uploadSongToI_KIT CALLED")

        return new Promise((res,rej)=>{


                    iKit.upload({
                        file : file[0].buffer,
                        fileName : new mongoose.Types.ObjectId().toString(),
                        folder : "/NewSongs"
                    },
                (error,result)=>{
                    if(error)
                    {
                        console.log("error while uplaoding on imageKit" ,error);
                        
                        return rej(error);
                    }
                    res(result);
                     console.log("result from Song kit ", result);
                }
                )
        })
}



function uploadImageToI_KIT(file){

console.log("🔥 uploadImageToI_KIT CALLED")
        return new Promise((res,rej)=>{

          
                    iKit.upload({
                        file : file[0].buffer,
                        fileName : new mongoose.Types.ObjectId().toString(),
                        folder : "/SongPic"
                    },
                (error,result)=>{
                    if(error)
                    {
                        console.log("error while uplaoding on imageKit" ,error);
                        
                       return rej(error);
                    }
                    res(result);
                    console.log("result from image kit ", result);
                }
                )
        })
}


function uploadCoverToI_KIT(file){
    return new Promise((res,rej)=>{
        iKit.upload({
            file: file.buffer,
            fileName: new mongoose.Types.ObjectId().toString(),
            folder: "/CoverPic"
        },
        (error, result)=>{
            if(error){
                console.log("error while uploading on imageKit", error);
                rej(error);
            }
            res(result);
        })

        })
}


module.exports = {
    uploadImageToI_KIT,
    uploadSongToI_KIT,
    uploadCoverToI_KIT
}
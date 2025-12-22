
const imagekit = require('imagekit')
const mongoose = require('mongoose')


var iKit = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL
})



function uploadSongToI_KIT(file){


        return new Promise((res,rej)=>{

            
                    iKit.upload({
                        file : file[0].buffer,
                        fileName : new mongoose.Types.ObjectId().toString(),
                        folder : "NewSongs"
                    },
                (error,result)=>{
                    if(error)
                    {
                        console.log("error while uplaoding on imageKit" ,error);
                        
                        rej(error);
                    }
                    res(result);
                }
                )
        })
}



function uploadImageToI_KIT(file){


        return new Promise((res,rej)=>{

          
                    iKit.upload({
                        file : file[0].buffer,
                        fileName : new mongoose.Types.ObjectId().toString(),
                        folder : "CoverPic"
                    },
                (error,result)=>{
                    if(error)
                    {
                        console.log("error while uplaoding on imageKit" ,error);
                        
                        rej(error);
                    }
                    res(result);
                }
                )
        })
}
module.exports = uploadSongToI_KIT;
module.exports = uploadImageToI_KIT;
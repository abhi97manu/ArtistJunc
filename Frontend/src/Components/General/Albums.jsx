import React, { useEffect, useState } from 'react'
import { getAlbumSongs } from '../../ApiData';


const Albums = ({albumData}) => {





  
  
  const [showCard, setShowCard] = useState(false);
  return (
    <div className='hover:scale-110' onMouseEnter={() => setShowCard(prev => !prev) } onMouseLeave={()=> setShowCard(prev=>!prev)}>
    <div className={`w-[14em] h-[20em] bg-stone-800/30 rounded-xl  border-red-300/10 hover:shadow-xl  text-center leading-12 text-stone-200 pt-3`} >
            <img src = {albumData.albumImg} alt = "A little light in the dark" className='h-32 w-32 rounded-sm object-cover translate-x-12 box-border my-8'></img>
            <h3>{albumData.albumName}</h3>
            <p>{"2024"}</p>
           
    </div>
     {showCard && <AlbumSongs  albumData = {albumData}/>}
    </div>
  )
}

export default Albums


function AlbumSongs ({show, albumData}) {

  const [songDet, setSongDet] = useState()

useEffect(()=>{
 async function getSongsfromApi(){
      const song = await getAlbumSongs(albumData._id)
     console.log(song.songs);
     
       setSongDet(song.songs)
  }

  getSongsfromApi()
},[])
 
    console.log("data",songDet);


  

 
  
  return (
    
    <>
    
    {<div className='w-full bg-linear-to-t from-stone-900 to-gray-500 h-full absolute top-0 left-0 border text-center rounded-2xl text-stone-200 ' > 
            <h1 className='mb-2'>Songs</h1>
            <div className='self-center border'>
            {
           songDet&&  songDet.map((song, index) => (
                <div key={index}>
                  
                  <p className='hover:scale-110 hover:cursor-pointer'>{song.Title}</p>
                  <hr className='w-[50%] place-self-center mb-2'></hr>
                </div>
              ))
            }
          </div>
            
          
       </div>}

    </>  
  )
}
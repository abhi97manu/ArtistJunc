import React, { useState } from 'react'



const Albums = ({albumData}) => {

  console.log(albumData , "albumData");
  
  const [showCard, setShowCard] = useState(false);
  return (
    <div className='hover:scale-110' onMouseEnter={() => setShowCard(prev => !prev) } onMouseLeave={()=> setShowCard(prev=>!prev)}>
    <div className={`w-[14em] h-[20em] bg-stone-800/30 rounded-xl  border-red-300/10 hover:shadow-xl  text-center leading-12 text-stone-200 pt-3`} >
            <img src = {albumData.albumImg} alt = "A little light in the dark" className='h-32 w-32 rounded-sm object-cover translate-x-12 box-border my-8'></img>
            <h3>{albumData.albumName}</h3>
            <p>{"2024"}</p>
           
    </div>
     <AlbumSongs show = {showCard} albumData = {albumData}/>
    </div>
  )
}

export default Albums


function AlbumSongs ({show, albumData}) {
  return (
    
    <>
    
    {show && <div className='w-full bg-stone-800/30 h-72 border text-center rounded-2xl text-stone-200 mt-10' > 
            <h1 className='mb-2'>Songs</h1>
            {
            albumData.Songs &&  albumData.Songs.map((song, index) => (
                <div key={index}>
                  
                  <p className='hover:scale-110 hover:cursor-pointer'>{song.Title}</p>
                  <hr className='w-[50%] place-self-center mb-2'></hr>
                </div>
              ))
            }
          
            
          
       </div>}

    </>  
  )
}
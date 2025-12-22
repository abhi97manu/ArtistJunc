import React, { useState } from 'react'



const Albums = ({source, title, year}) => {

  const [showCard, setShowCard] = useState(false);
  return (
    <div className='hover:scale-110' onMouseEnter={() => setShowCard(prev => !prev) } onMouseLeave={()=> setShowCard(prev=>!prev)}>
    <div className={`w-[14em] h-[20em] bg-stone-800/30 rounded-xl  border-red-300/10 hover:shadow-xl  text-center leading-12 text-stone-200 pt-3`} >
            <img src = {source} alt = "A little light in the dark" className='h-32 w-32 rounded-sm object-cover translate-x-12 box-border my-8'></img>
            <h3>{title}</h3>
            <p>{year}</p>
           
    </div>
     <AlbumSongs show = {showCard}/>
    </div>
  )
}

export default Albums


function AlbumSongs ({show}) {
  return (
    
    <>
    
    {show && <div className='w-full h-72  text-center rounded-2xl text-stone-200 mt-10' > 
            <h1 className='mb-2'>Songs</h1>
            <hr className='w-[50%] place-self-center mb-2'></hr>
            <p className='hover:scale-110'>SONG 1</p>
            <hr className='w-[30%] place-self-center mb-2'></hr>
            <p className='hover:scale-110'>SONG 1</p>
            <hr className='w-[30%] place-self-center mb-2'></hr>
            <p className='hover:scale-110'>SONG 1</p>
            <hr className='w-[30%] place-self-center mb-2'></hr>
            <p className='hover:scale-110'>SONG 1</p>
            <hr className='w-[30%] place-self-center mb-2'></hr>
            
          
       </div>}

    </>  
  )
}
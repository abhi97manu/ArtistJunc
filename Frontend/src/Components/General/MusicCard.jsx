import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlay, setCurrentSong, setSong, setIsPlaying } from '../../Store/Slice/SongSlice'
import { getLatestSong } from '../../ApiData' 

const MusicCard = () => {

 

  const songId = useSelector((state)=> state.currentPlaying.songId)
  const isPlaying = useSelector((state)=> state.currentPlaying.isPlaying)
  const currentPlaying = useSelector((state)=>state.currentPlaying.currentPlaying)
  const dispatch = useDispatch()
  const [latestSongDetails, setLatestSongDetails] = useState();



   useEffect(()=>{
      const fetchlatest = async()=>{
          const detail = await getLatestSong()
          setLatestSongDetails(detail)
         
       
          
      }
      fetchlatest()
  },[])
  
  const Controller=()=>{
         
        
       if(latestSongDetails?._id===songId)
         dispatch(togglePlay())

        dispatch(setSong(latestSongDetails?._id))
        dispatch(setCurrentSong(latestSongDetails))
        
      
  }

  return (
    <div className='lg:w-[25rem] lg:h-[10rem] h-[6rem]  w-[14rem]  p-2 rounded-md justify-center items-center  absolute border-2 border-white bg-black/60 bottom-5 lg:left-40 left-2 text-white grid grid-cols-3'>
        <div className='row-1 mx-2 flex flex-col   lg:col-span-2 col-span-2 '>
          <h6 className='text-[0.7rem]/0  italic'>Recent Release</h6>
        <h1 className=' lg:text-4xl lg:font-bold text-2xl  font-bold  font-(family-name:"Wix Madefor Display":sans-serif)'>{latestSongDetails?.Title}</h1>

        </div>
        <div className='lg:row-2 lg:col-span-2 col-span-1 lg:px-4 flex gap-2 items-center lg:flex'>
          {
            songId === latestSongDetails?._id && isPlaying? <img src = "pauseButn.svg" className='w-10 h-10 ' onClick={()=>Controller()}></img>
              :
              <img src = "playButn.svg" className='w-10 h-10 ' onClick={()=>Controller()}></img>
          }
            <div className='italic gap-2 text-xs lg:flex hidden'>
              
            <h4 >3:23 mins</h4>
            </div>
        </div>
        <img src = {latestSongDetails?.ImageFile}   className='  lg:h-[8rem] lg:row-span-2 lg:col-span-1 hidden lg:flex rounded-sm'></img>

    </div>
  )
}

export default MusicCard
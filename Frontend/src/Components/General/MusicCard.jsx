import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlay, setSong } from '../../Store/Slice/SongSlice'

const MusicCard = () => {

  const songId = useSelector((state)=> state.currentPlaying.songId)
  const isPlaying = useSelector((state)=> state.currentPlaying.isPlaying)
  const dispatch = useDispatch()
  return (
    <div className='lg:w-[25rem] h-32 lg:h-fit w-[15rem]  p-2 rounded-md  absolute border-2 border-white bg-black/70 bottom-5 lg:left-40 left-2 text-white grid grid-cols-3'>
        <h1 className=' SongTitle row-1 col-span-2 self-center mx-3 font-(family-name:"Wix Madefor Display":sans-serif)'>Last Goodbyes</h1>
        <div className='   row-2 col-span-2 px-5 flex gap-2 items-center lg:flex'>
          {
            isPlaying? <img src = "playButn.svg" className='w-10 h-10 ' onClick={()=>dispatch(togglePlay())}></img>
              :
              <img src = "pauseButn.svg" className='w-10 h-10 ' onClick={()=>dispatch(togglePlay())}></img>
          }
            <div className='italic text-xs lg:flex hidden'>
              
            <h4 >3:23 mins</h4>
            <h6 >Recent Release</h6>
            </div>
        </div>
        <img src = "Lgoodbye.jpg"   className=' lg:w-[8rem] lg:h-[12rem] row-span-2 col-span-1 hidden lg:flex rounded-sm'></img>

    </div>
  )
}

export default MusicCard
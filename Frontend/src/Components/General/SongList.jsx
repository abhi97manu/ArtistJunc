import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlay } from '../../Store/Slice/SongSlice'

const SongList = () => {

    const isPlaying = useSelector((state)=>state.currentPlaying.isPlaying)
    const dispatch = useDispatch();

  return (
    <div className='w-full h-14 bg-stone-950/70 mb-2 justify-between gap-4 text-white flex items-center p-2 rounded-xl'>
        
        <div className='h-full flex  gap-3 items-center '>
            
        {isPlaying ? <img src='playButn.svg' className='h-full' onClick={()=>dispatch(togglePlay())}></img>: <img src='pauseButn.svg' className='h-full' onClick={()=>dispatch(togglePlay())}></img>}
        <h1>SongName</h1>
        </div>

        <div>
            <h1>Duration</h1>
        </div>
        
    </div>
  )
}

export default SongList
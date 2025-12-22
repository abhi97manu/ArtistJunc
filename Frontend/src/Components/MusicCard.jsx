import React from 'react'

const MusicCard = () => {
  return (
    <div className='w-[25rem] p-2 rounded-md  absolute border-2 border-white bg-black/70 top-100 left-40 text-white grid grid-cols-3'>
        <h1 className=' SongTitle row-1 col-span-2 self-center mx-3 font-(family-name:"Wix Madefor Display":sans-serif)'>Last Goodbyes</h1>
        <div className='   row-2 col-span-2 px-5 flex gap-2 items-center'>
            <img src = "play.png" className='w-10 h-10' ></img>
            <div className='italic text-xs '>
              
            <h4 >3:23 mins</h4>
            <h6 >Recent Release</h6>
            </div>
        </div>
        <img src = "Lgoodbye.jpg"   className=' w-[8rem] h-[12rem] row-span-2 col-span-1  rounded-sm'></img>

    </div>
  )
}

export default MusicCard
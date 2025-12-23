import React from 'react'
import MusicCard from '../Components/MusicCard'
import TourGuide from '../Components/TourGuide'
import Albums from '../Components/Albums'
import Media from '../Components/Media'

const LandingPage = () => {
  return (
    <div className='bg-gray-900 w-full'>
      <div className='firstPage'>
        <img src = "dotanProfile.jpg" width={"100%"}/>
        < MusicCard/>

      </div>
      <div className='secondPage relative'>
        <img src = "dotan-concert.jpg" width={"100%"} />
          <TourGuide/>
      </div>
      <div className='relative flex justify-center' >
           <img src = "bg-Mount.jpg"  className=' object-none blur-md'/>
           <h2 className='absolute  text-5xl font-bold mt-30 text-transparent bg-linear-to-r from-stone-200 to-stone-800 bg-clip-text'>DISCOGRAPHY</h2>
          <div className='absolute top-50 z-1 w-full  flex justify-center gap-7 p-4'>
             
            <Albums source = {"./LLID.jpg"} title = {"A Little Light in the Dark"} year = {"2024"}/>
            <Albums source = {"./Satll.jpg"} title = {"Satellites"} year = {"2021"}/>
            <Albums source = {"./7lyrs.jpg"} title = {"7 Layers"} year = {"2014"}/>
            </div>


      </div>
       {/* <Media currentPlaying={""}/> */}
    </div>
  )
}

export default LandingPage
import React, { lazy, Suspense, useContext, useEffect, useState } from "react";



import Cards_OverV from "./Admin_components/Cards_OverV";

import AllSongCard from "./Admin_components/AllSongCard";
import AlbumCarasoul from "./Admin_components/AlbumCarasoul";
import { getTotalAlbums, getUserSongs } from "../../userApiData";


const AdminSec = () => {

  const [TotAlbCount, SetTotAlbCount] = useState();
  const [TotSongCount, SetTotSongCount] = useState()


useEffect(()=>{

async function getOverviewDet (){
 SetTotAlbCount(await getTotalAlbums())

 const {totalLength} = await getUserSongs()
 SetTotSongCount(totalLength)

}
getOverviewDet()
},[])




 
  return (
    <>
      <div className="h-full md:w-[80%] w-full ">
        <div className=" lg:w-[80%] w-full place-self-center p-2 ">
          <div className="grid grid-cols-3 p-2 gap-3  ">
            <Cards_OverV label="Total Songs" value={`${TotSongCount}`} icon= "music_card_logo.svg" />
            <Cards_OverV label="Total Albums" value={`${TotAlbCount}`} icon= "album_card.svg" />
            <Cards_OverV label="Upcoming Tour" value="9213" icon= "tour.svg" />
          </div>
          {/* All Songs Container */}
         <AllSongCard value = "Songs" label = "My Singles" />

          {/* Add Albums List  */}
          <AllSongCard value = "Album" label = "My Albums" ></AllSongCard>

         {/* <AlbumCarasoul/> */}
          
        </div>
      </div>

     

      {/* <Media currentPlaying={currentPlaying} /> */}
    </>
  );
};

export default AdminSec;







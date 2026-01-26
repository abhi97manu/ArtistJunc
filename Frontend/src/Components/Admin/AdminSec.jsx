import React, { lazy, Suspense, useContext, useEffect, useState } from "react";



import Cards_OverV from "./Admin_components/Cards_OverV";

import AllSongCard from "./Admin_components/AllSongCard";


const AdminSec = () => {
  

 
  return (
    <>
      <div className="h-full md:w-[80%] w-full ">
        <div className=" lg:w-[80%] w-full place-self-center p-2 ">
          <div className="grid grid-cols-3 p-2 gap-3  ">
            <Cards_OverV label="Total Songs" value="9213" icon= "music_card_logo.svg" />
            <Cards_OverV label="Total Albums" value="9213" icon= "album_card.svg" />
            <Cards_OverV label="Upcoming Tour" value="9213" icon= "tour.svg" />
          </div>
          {/* All Songs Container */}
         <AllSongCard value = "Songs" label = "My Songs" />

          {/* Add Albums List  */}
          <AllSongCard value = "Album" label = "My Albums" ></AllSongCard>
          
        </div>
      </div>

     

      {/* <Media currentPlaying={currentPlaying} /> */}
    </>
  );
};

export default AdminSec;







import React, { lazy, Suspense, useContext, useEffect, useState } from "react";



import Cards_OverV from "./Admin_components/Cards_OverV";

import AllSongCard from "./Admin_components/AllSongCard";


const AdminSec = () => {
  

 
  return (
    <>
      <div className="h-full w-full  ">
        <div className=" lg:w-[62rem] w-full place-self-center p-2 ">
          <div className="grid grid-cols-3 p-2 gap-3 place-self-center ">
            <Cards_OverV label="Total Songs" value="9213" />
            <Cards_OverV label="Total Albums" value="9213" />
            <Cards_OverV label="Upcoming Tour" value="9213" />
          </div>
          {/* All Songs Container */}
         <AllSongCard value = "Songs" label = "All Songs" />

          {/* Add Albums List  */}
          <AllSongCard value = "Album" label = "All Albums" ></AllSongCard>
          
        </div>
      </div>

     

      {/* <Media currentPlaying={currentPlaying} /> */}
    </>
  );
};

export default AdminSec;







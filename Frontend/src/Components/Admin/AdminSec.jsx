import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";


const AlbumCard = lazy(() => import("./Admin_components/AlbumCard"));

import Media from "../General/Media";

import ImageKit from "imagekit-javascript";
import Cards_OverV from "./Admin_components/Cards_OverV";

import BlankCard from "./Admin_components/BlankCard";
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
          {/* <span className="w-full  h-10  -translate-y-7 border flex bg-white blur"></span> */}

          {/* Add Albums List  */}
          <AllSongCard value = "Album" label = "All Albums" ></AllSongCard>
          {/* <div className=" w-full mt-7 rounded-lg shadow-2xl bg-white">
            <div className=" flex items-center p-3 justify-between">
              <h2 className="text-2xl  font-bold mx-4 ">Albums</h2>
              <BlankCard setAddNew={setAddAlbum} value="Add Album" />
            </div>
            <div className=" grid grid-cols-3 box-border md:grid-cols-4 p-4  gap-2 md:gap-2 h-72  overflow-y-auto  lg:gap-6 w-full lg:w-[70rem] place-self-center ">
              <Suspense fallback={loader}>
                {" "}
                {Object.entries(allAlbums).map(([key, value]) => {
                  //  console.log("albums", value);

                  return <AlbumCard key={key} name={key} data={value} />;
                })}
              </Suspense>
            </div>
          </div> */}
        </div>
      </div>

     

      {/* <Media currentPlaying={currentPlaying} /> */}
    </>
  );
};

export default AdminSec;








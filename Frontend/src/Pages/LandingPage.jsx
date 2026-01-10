import React, { useEffect, useState } from "react";
import MusicCard from "../Components/General/MusicCard";
import TourGuide from "../Components/General/TourGuide";
import Albums from "../Components/General/Albums";
import Media from "../Components/General/Media";
import axios from "axios";
import Navbar from "../Components/General/Navbar";
import { useDispatch, useSelector } from "react-redux";

import {play,pause,setSong,togglePlay} from '../Store/Slice/SongSlice'


const serverUrl = import.meta.env.VITE_SERVER_URL;
const LandingPage = () => {

  const isPlaying = useSelector((state)=> state.currentPlaying.isPlaying)
  const songId = useSelector((state)=>state.currentPlaying.songId)
  const dispatch = useDispatch()

  console.log("redux ", isPlaying);
  

  const [discogrph, setdescogrph] = useState();

  useEffect(() => {
    axios
      .get(`${serverUrl}/albums`)
      .then((response) => {
        setdescogrph(response.data);

        console.log("albums data", response.data);
      })
      .catch((error) => {
        console.log("error in albums read", error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full h-fit">
        <div className=" relative h-58 lg:h-full">
         
          <img src="dotanProfile.jpg" width={"100%"} />
          <MusicCard />
          <button className="w-32 h-8 absolute top-40 left-0 bg-blue-400 " onClick={()=>dispatch(togglePlay())}>play</button>
        </div>
        <div className=" relative">
          <img src="dotan-concert.jpg" width={"100%"} />
          <TourGuide />
        </div>
        <div className="relative h-full flex justify-center">
          <img
            src="bg-Mount.jpg"
            className="h-screen w-full lg:object-fit object-cover blur-sm"
          />
          <h2 className="absolute  text-5xl font-bold mt-58 text-transparent bg-linear-to-r from-stone-200 to-stone-800 bg-clip-text">
            DISCOGRAPHY
          </h2>
          <div className="absolute top-[40%] z-1 w-full  flex justify-center gap-7 p-4">
            {discogrph &&
              Object.entries(discogrph).map(([i, album]) => {
                return <Albums key={i} albumData={album} />;
              })}
          </div>
        </div>
        <Media currentPlaying={""} />
      </div>
    </>
  );
};

export default LandingPage;

import React, { lazy, Suspense, useContext, useEffect, useState } from "react";



import Cards_OverV from "./Admin_components/Cards_OverV";

import AllSongCard from "./Admin_components/AllSongCard";
import AlbumCarasoul from "./Admin_components/AlbumCarasoul";
import { getTotalAlbums, getUserSongs } from "../../userApiData";


const AdminSec = () => {
  const [TotAlbCount, SetTotAlbCount] = useState();
  const [TotSongCount, SetTotSongCount] = useState();

  useEffect(() => {
    async function getOverviewDet() {
      SetTotAlbCount(await getTotalAlbums());

      const { totalLength } = await getUserSongs();
      SetTotSongCount(totalLength);
    }
    getOverviewDet();
  }, []);

  return (
    <div className="min-h-full w-full py-2 sm:py-4">
      <div className="mx-auto w-full max-w-5xl px-1 sm:px-2">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Cards_OverV
            label="Total Songs"
            value={`${TotSongCount}`}
            icon="music_card_logo.svg"
          />
          <Cards_OverV
            label="Total Albums"
            value={`${TotAlbCount}`}
            icon="album_card.svg"
          />
          <Cards_OverV
            label="Upcoming Tour"
            value="9213"
            icon="tour.svg"
          />
        </div>

        <AllSongCard value="Songs" label="My Singles" />
        <AllSongCard value="Album" label="My Albums" />
      </div>
    </div>
  );
};

export default AdminSec;







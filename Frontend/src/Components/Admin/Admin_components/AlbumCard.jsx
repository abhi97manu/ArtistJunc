import React, { useState } from 'react'
import AlbumSongsList from './AlbumSongsList';

const AlbumCard = ({ data }) => {
  
  
  // const { setCurrentPlaying, setIsPlaying } = useContext(DataContext);
  const [showAlbumlist, setShowAlbumList] = useState(false);
  return (
    <div className="h-62 rounded-2xl  col-span-1 text-center grid justify-center ">
      {
        <>
          <div
            className={` bg-black w-32 h-32 mt-3 rounded-full border flex justify-center items-center bg-cover bg-center transition-transform  hover:rotate-360 ease-in-out  duration-2500 delay-150`}
            style={{ backgroundImage: `url(${data.albumImg})` }}
          >
            <div className="w-8 h-8 bg-red-800 rounded-full text-white bg-gradient-to-b box-content border-3 border-black  from-stone-950 from-10% via-stone-200 via-50% to-stone-950 to-90% font-black">
              <svg viewBox="-30 -30 100 100" class="w-8 h-8 ">
                <circle cx="20" cy="20" r="15" fill="#e4dadaff" />
              </svg>
            </div>
          </div>
          {/* <img src = {list[0].ImageFile} className=' w-38 h-38 object-fit rounded-full mt-4'></img> */}
          <h2
            className="font-bold hover:cursor-pointer hover:underline text-xl"
            onClick={() => setShowAlbumList((prev) => !prev)}
          >
            {data.albumName}
          </h2>
          <h4 className="font-thin text-sm italic">Dotan</h4>
        </>
      }

      {showAlbumlist && (
        <AlbumSongsList
          songData={data.songs}
          albumData={data}
          toggleCard={setShowAlbumList}
        />
      )}
    </div>
  );
};

export default AlbumCard
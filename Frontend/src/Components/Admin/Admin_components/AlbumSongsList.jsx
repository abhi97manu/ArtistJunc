import React, { useContext } from 'react'
import NewSongCard from './NewSongCard'
import { SongContext } from '../Admin_Context/Context';

const AlbumSongsList = ({ songData, albumData, toggleCard }) => {

  console.log("song", songData, " albumData", albumData);
  const {isPlaying,setIsPlaying} = useContext(SongContext)
  return (
    <div
      className="w-full h-full bg-stone-800/60 absolute top-0 left-0 items-center text-center flex justify-center "
      onClick={() => toggleCard((prev) => !prev)}
    >
      <div className="">
        <div
          className="w-[28rem] h-fit place-self-center bg-white rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-32 text-start px-4 items-center flex">
            <h1>{albumData.albumName}</h1>
            <img></img>
          </div>

          {songData.map((value, key) => {
            console.log("inside album ", value, value._id);
            
            return (
              <NewSongCard  key={value._id}
                    songData={value}
                    isPlaying={isPlaying === value._id}
                    onClick={() => {
                      setIsPlaying(value._id);
                    }}
                  
                    //setAddNew={setAddNew}
                    />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AlbumSongsList
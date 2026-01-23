import React, { useContext } from 'react'
import NewSongCard from './NewSongCard'
import { SongContext } from '../Admin_Context/Context';

const AlbumSongsList = ({ songData, albumData, toggleCard }) => {

  console.log("song", songData, " albumData", albumData.albumImg);
  const {isPlaying,setIsPlaying} = useContext(SongContext)
  return (
    <div
      className="w-full h-full bg-stone-800/60 absolute top-0 left-0 items-center text-center flex justify-center "
      onClick={() => toggleCard((prev) => !prev)}
    >
      <div className="">
        <div
          className="w-[28rem] h-fit place-self-center bg-white p-3 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-46 text-start items-center p-2 gap-3 rounded-t-lg bg-contain flex bg-linear-to-t from-cyan-500 to-blue-200" >
            <img src={albumData.albumImg} className='bg-contain h-32 rounded-[10px] w-32 border-white '></img>
            <h1 className='font-bold uppercase'>{albumData.albumName}</h1>
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
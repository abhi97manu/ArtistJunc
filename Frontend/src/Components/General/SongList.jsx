import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePlay, setSong,setIsPlaying } from "../../Store/Slice/SongSlice";

const SongList = ({ value, }) => {
  const isPlaying = useSelector((state) => state.currentPlaying.isPlaying);
  const songId = useSelector((state) => state.currentPlaying.songId);
  const dispatch = useDispatch();

 

  function playCheck() {
   // dispatch(setSong(value._id));
   if(value._id===songId)
    dispatch(togglePlay())

   else{
   dispatch(setSong(value._id))
   dispatch(setIsPlaying(true))
   }
  
//   console.log("key, value", [value._id, songId]);
//  isPlaying? dispatch(setSong(value._id)) : dispatch(setSong(""))
    
  }

  return (
    <div className="w-full h-14 bg-stone-950/70 mb-2 justify-between gap-4 text-white flex items-center p-2 rounded-xl">
      <div className="h-full flex  gap-3 items-center ">
        { value._id===songId && isPlaying? (
          <img
            src="pauseButn.svg"
            className="h-full"
            onClick={() => playCheck()}
          ></img>
        ) : (
          <img
            src="playButn.svg"
            className="h-full"
            onClick={() => playCheck()}
          ></img>
        )}
        <h1>{value.Title}</h1>
      </div>

      <div>
        <h1>Duration</h1>
      </div>
    </div>
  );
};

export default SongList;

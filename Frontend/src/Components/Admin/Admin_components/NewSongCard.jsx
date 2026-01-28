import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../Admin_Context/Context";
import { setIsPlaying } from "../../../Store/Slice/SongSlice";

const NewSongCard = ({ songData, isPlaying, onClick }) => {
  const [play, setPlay] = useState(false);
  const { currentSong, setCurrentSong } = useContext(SongContext);
  const audioRef = useRef(null);

  const serverUrl = import.meta.env.VITE_SERVER_URL;
 // console.log("isPlaying idf ", isPlaying);
  const [metadata, setMetaData] = useState({
    duration: 0,
    currentTime: 0,
    volume: 0,
  });

    //console.log("current Song",currentSong);
    
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentSong;
    audio.load();
audio.play()
    audio.addEventListener("loadedmetadata", () => {
      setMetaData({
        duration: audio.duration,
        volume: audio.volume,
      });
    });

    // audio.play();

    return () =>{
      audio.removeEventListener("loadedmetadata", () => {
        setMetaData({
          duration: audio.duration,

          volume: audio.volume,
        });
      });
    
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", () => {
      setMetaData({ ...metadata, currentTime: audio.currentTime ?? 0 });
    });

    return () =>
      removeEventListener("timeupdate", () => {
        setMetaData({ ...metadata, currentTime: audio.currentTime ?? 0 });
      });
  }, [metadata]);

 
  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
 
    
    play ? audio.pause() : audio.play();

    // setCurrentSong("")

    //onClick();
  }

  async function deleteMedia(audio) {
    try {
      const res = await axios.delete(
        `${serverUrl}/admin/delete_song/${audio._id}`,
        { withCredentials: true },
      );
      console.log("deleted song ", res);
    } catch (err) {
      console.log("error in deleting song ", err);
    }
  }

  function timeFormat(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="border-b-1 p-2 flex flex-col gap-2">
      <div className=" h-12  flex box-border px-2 ">
        <img src={songData.ImageFile} className="  w-12 "></img>
        <div className="grid grid-cols-3 items-center text-center justify-center px-2 w-full">
          <div className="col-span-2 leading-4 items-center px-6 ">
            <div className="flex gap-2 items-center">
              <h1 className="text-md font-bold">{songData.Title}</h1>
              <span className="h-1 w-1 rounded-full bg-black"></span>
              <h1 className="text-sm font-medium underline">{songData.Feat}</h1>
            </div>

            <h1 className="text-sm font-light italic place-self-start">
              {songData.Type}
            </h1>
          </div>
          <div className="col-span-1 place-self-end mb-2 flex  gap-2">
            {!isPlaying || !play ? (
              <svg
                fill="rgb(6, 40, 194)"
                height="30px"
                width="30px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 492.308 492.308"
                xml:space="preserve"
                onClick={() => {
                  setCurrentSong(songData.AudioFile);
                  onClick();
                  setPlay(true);
                  togglePlay();
                 
                }}
                className="hover:cursor-pointer"
              >
                <g>
                  <g>
                    <path d="M139.346,118.995v254.313l261.74-127.154L139.346,118.995z M159.038,150.457l196.99,95.697l-196.99,95.692V150.457z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M246.154,0C110.423,0,0,110.423,0,246.154s110.423,246.154,246.154,246.154s246.154-110.423,246.154-246.154
                  S381.885,0,246.154,0z M246.154,472.615c-124.875,0-226.462-101.591-226.462-226.462S121.279,19.692,246.154,19.692
                  s226.462,101.591,226.462,226.462S371.029,472.615,246.154,472.615z"
                    />
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                fill="rgb(6, 40, 194)"
                height="30px"
                width="30px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 492.308 492.308"
                xml:space="preserve"
                onClick={() => {
                  //  onClick();
                  setPlay(false);
                  togglePlay();
                }}
                className="hover:cursor-pointer"
              >
                {/* Pause bars */}
                <g>
                  <g>
                    <path d="M176.923,138.462h49.231v215.385h-49.231V138.462z" />
                    <path d="M266.154,138.462h49.231v215.385h-49.231V138.462z" />
                  </g>
                </g>

                {/* Outer circle */}
                <g>
                  <g>
                    <path
                      d="M246.154,0C110.423,0,0,110.423,0,246.154s110.423,246.154,246.154,246.154
        s246.154-110.423,246.154-246.154S381.885,0,246.154,0z
        M246.154,472.615c-124.875,0-226.462-101.591-226.462-226.462
        S121.279,19.692,246.154,19.692s226.462,101.591,226.462,226.462
        S371.029,472.615,246.154,472.615z"
                    />
                  </g>
                </g>
              </svg>
            )}

            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => deleteMedia(songData)}
              className="hover:cursor-pointer"
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                stroke="#E53935"
                stroke-width="1"
              />
              <path
                d="M9 8H15M10 8V7C10 6.45 10.45 6 11 6H13C13.55 6 14 6.45 14 7V8M8 8L9 17C9 17.55 9.45 18 10 18H14C14.55 18 15 17.55 15 17L16 8"
                stroke="#E53935"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {isPlaying && (
        <div className="w-full justify-center items-center gap-4 px-3 bg-sky-400 rounded-lg flex h-6 ">
          {<audio ref={audioRef}></audio>}
          <p className="text-[12px] w-8">{timeFormat(metadata?.currentTime)}</p>
          <input
            type="range"
            className="w-full slider"
            min="0.0"
            max={Math.floor(metadata?.duration)}
            value={metadata?.currentTime}
          ></input>
          <p className="text-[12px]">{timeFormat(metadata?.duration)}</p>
        </div>
      )}
    </div>
  );
};
export default NewSongCard;

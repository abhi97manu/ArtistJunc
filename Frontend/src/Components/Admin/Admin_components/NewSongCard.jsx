import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../Admin_Context/Context";

const NewSongCard = ({ songData, isPlaying, onClick, setDelSong, isalbum }) => {
  const [play, setPlay] = useState(false);

  const { currentSong, setCurrentSong } = useContext(SongContext);
  const audioRef = useRef(null);

  const serverUrl = import.meta.env.VITE_SERVER_URL || "";
  const apiBase = serverUrl.endsWith("/") ? serverUrl : `${serverUrl}/`;
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
    audio.play();
    audio.addEventListener("loadedmetadata", () => {
      setMetaData({
        duration: audio.duration,
        volume: audio.volume,
      });
    });
   console.log("inside album song list ",currentSong);
    // audio.play();

    return () => {
      audio.removeEventListener("loadedmetadata", () => {
        setMetaData({
          duration: 0,

          volume: 0,
        });
      });
    };
  }, [currentSong,isPlaying]);

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
      await axios.delete(`${apiBase}songs/${audio._id}`, {
        withCredentials: true,
      });
      setDelSong();
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
    <div className="flex flex-col gap-3 rounded-[24px] border border-violet-100 bg-white p-3 shadow-[0_10px_24px_rgba(83,61,117,0.08)] transition hover:border-violet-200 hover:shadow-[0_16px_30px_rgba(83,61,117,0.12)] sm:p-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <img
          src={songData.ImageFile}
          className="h-14 w-14 rounded-2xl object-cover sm:h-16 sm:w-16"
          alt={songData.Title}
        ></img>
        <div className="flex min-w-0 flex-1 flex-row gap-3  items-center justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                {songData.Title}
              </h1>
              {songData.Feat && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300"></span>
                  <h1 className="truncate text-sm font-medium text-violet-700">
                    {songData.Feat}
                  </h1>
                </>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                {songData.Type || "Single"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            {!isPlaying || !play ? (
              <button
                type="button"
                onClick={() => {
                  setCurrentSong(songData.AudioFile);
                  onClick();
                  setPlay(true);
                  togglePlay();
                }}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 translate-x-[1px] fill-current transition group-hover:scale-105"
                  aria-hidden="true"
                >
                  <path d="M8 6.5v11l9-5.5-9-5.5z" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPlay(false);
                  togglePlay();
                }}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-violet-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current transition group-hover:scale-105"
                  aria-hidden="true"
                >
                  <path d="M8 6h3v12H8zm5 0h3v12h-3z" />
                </svg>
              </button>
            )}

            {!isalbum && (
              <button
                type="button"
                onClick={() => {
                  deleteMedia(songData);
                }}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-rose-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 stroke-current transition group-hover:scale-105"
                  fill="none"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 8h6" />
                  <path d="M10 8V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1" />
                  <path d="M8 8l1 9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l1-9" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {isPlaying && (
        <div className="flex h-10 w-full items-center gap-3 rounded-2xl bg-[linear-gradient(90deg,rgba(243,237,247,1)_0%,rgba(237,233,254,1)_100%)] px-3">
          {<audio ref={audioRef}></audio>}
          <p className="w-9 text-[12px] font-medium text-slate-600">
            {timeFormat(metadata?.currentTime)}
          </p>
          <input
            type="range"
            className="slider w-full accent-violet-600"
            min="0.0"
            max={Math.floor(metadata?.duration)}
            value={metadata?.currentTime}
          ></input>
          <p className="text-[12px] font-medium text-slate-600">
            {timeFormat(metadata?.duration)}
          </p>
        </div>
      )}
    </div>
  );
};
export default NewSongCard;

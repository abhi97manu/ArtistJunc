import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setSong, togglePlay } from "../../Store/Slice/SongSlice";
import { useGetSong } from "../../ApiData";

const SongList = ({ value, index = 0 }) => {
  const isPlaying = useSelector((state) => state.currentPlaying.isPlaying);
  const songId = useSelector((state) => state.currentPlaying.songId);
  const dispatch = useDispatch();
  const { getClickedSong } = useGetSong();
  const isCurrentSong = value._id === songId;

  function playCheck(id) {
    getClickedSong(id);

    if (isCurrentSong) {
      dispatch(togglePlay());
      return;
    }

    dispatch(setSong(value._id));
    dispatch(setIsPlaying(true));
  }

  return (
    <article className="flex items-center justify-between gap-4 rounded-[22px] border border-violet-100 bg-white/85 p-3 text-slate-900 shadow-[0_10px_26px_rgba(83,61,117,0.08)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_16px_32px_rgba(83,61,117,0.13)]">
      <div className="flex min-w-0 items-center gap-3">
        <span className="hidden w-8 text-center text-sm font-black text-violet-400 sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => playCheck(value._id)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_12px_22px_rgba(109,40,217,0.22)] transition hover:brightness-105 ${
            isCurrentSong && isPlaying
              ? "bg-violet-100 text-violet-700 shadow-none"
              : "bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)]"
          }`}
          title={isCurrentSong && isPlaying ? "Pause song" : "Play song"}
        >
          {isCurrentSong && isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-base font-black sm:text-lg">
            {value.Title}
          </h2>
          <p className="truncate text-sm font-medium text-slate-500">
            {value.Feat ? `Feat. ${value.Feat}` : value.Type || "Single"}
          </p>
        </div>
      </div>

      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
        {value.Type || "Single"}
      </span>
    </article>
  );
};

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 translate-x-0.5 fill-current"
    aria-hidden="true"
  >
    <path d="M8 5.75v12.5L18 12 8 5.75z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M7.5 6h3.5v12H7.5V6zm5.5 0h3.5v12H13V6z" />
  </svg>
);

export default SongList;

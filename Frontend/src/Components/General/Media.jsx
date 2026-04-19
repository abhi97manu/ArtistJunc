import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, togglePlay } from "../../Store/Slice/SongSlice";

const Media = () => {
  const [audioMetaData, setAudioMetaData] = useState({
    duration: 0,
    currentTime: 0,
    volume: 0.75,
  });
  const isPlaying = useSelector((state) => state.currentPlaying.isPlaying);
  const currentSong = useSelector((state) => state.currentPlaying.currentSong);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const hasSong = Boolean(currentSong?.AudioFile);
  const progress =
    audioMetaData.duration > 0
      ? (audioMetaData.currentTime / audioMetaData.duration) * 100
      : 0;
  const volumeProgress = audioMetaData.volume * 100;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasSong) return;

    audio.src = currentSong.AudioFile;
    audio.load();

    function handleLoadedMetadata() {
      setAudioMetaData((prev) => ({
        ...prev,
        duration: audio.duration || 0,
        currentTime: 0,
      }));
    }

    function handleTimeUpdate() {
      setAudioMetaData((prev) => ({
        ...prev,
        currentTime: audio.currentTime || 0,
      }));
    }

    function handleEnded() {
      dispatch(setIsPlaying(false));
      setAudioMetaData((prev) => ({
        ...prev,
        currentTime: 0,
      }));
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, dispatch, hasSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = audioMetaData.volume;
  }, [audioMetaData.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasSong) return;

    if (isPlaying) {
      audio.play().catch(() => {
        dispatch(setIsPlaying(false));
      });
    } else {
      audio.pause();
    }
  }, [dispatch, hasSong, isPlaying]);

  function playPause() {
    if (!hasSong) return;
    dispatch(togglePlay());
  }

  function seekAudio(e) {
    const nextTime = Number(e.target.value);
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = nextTime;
    setAudioMetaData((prev) => ({
      ...prev,
      currentTime: nextTime,
    }));
  }

  function changeVolume(e) {
    const nextVolume = Number(e.target.value);
    const audio = audioRef.current;

    if (audio) {
      audio.volume = nextVolume;
    }

    setAudioMetaData((prev) => ({
      ...prev,
      volume: nextVolume,
    }));
  }

  function timeFormat(time) {
    if (!Number.isFinite(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  if (!hasSong) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 sm:px-5">
      <style>{rangeStyle}</style>
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/25 bg-slate-950/35 shadow-[0_20px_55px_rgba(15,23,42,0.2)] backdrop-blur-md">
        <div className="group relative h-2 bg-violet-100/35">
          <div
            className="h-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] transition-[width]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min={0}
            max={Math.floor(audioMetaData.duration) || 0}
            value={Math.floor(audioMetaData.currentTime) || 0}
            onChange={seekAudio}
            className="media-range media-range-invisible absolute inset-x-0 top-1/2 h-7 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent opacity-0 accent-violet-700 transition group-hover:opacity-100 focus:opacity-100"
            title="Seek"
          />
        </div>

        <div className="grid gap-4 px-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={currentSong.ImageFile}
              alt={currentSong.Title || "Current song"}
              className="h-14 w-14 rounded-2xl object-cover shadow-[0_12px_24px_rgba(83,61,117,0.14)]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                Now Playing
              </p>
              <h2 className="truncate text-base font-black text-white drop-shadow-sm sm:text-lg">
                {currentSong.Title || "Untitled track"}
              </h2>
              <p className="truncate text-sm font-medium text-white/75">
                {currentSong.Feat ? `Feat. ${currentSong.Feat}` : "Latest release"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white transition hover:bg-white/25 sm:inline-flex"
              title="Previous"
            >
              <SkipIcon direction="prev" />
            </button>

            <button
              type="button"
              onClick={playPause}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white shadow-[0_16px_30px_rgba(109,40,217,0.32)] transition hover:-translate-y-0.5 hover:brightness-105"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white transition hover:bg-white/25 sm:inline-flex"
              title="Next"
            >
              <SkipIcon direction="next" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="flex items-center gap-2 text-xs font-bold text-white/80">
              <span>{timeFormat(audioMetaData.currentTime)}</span>
              <span className="text-white/45">/</span>
              <span>{timeFormat(audioMetaData.duration)}</span>
            </div>

            <div className="flex w-36 items-center gap-2 text-white sm:w-44">
              <VolumeIcon />
              <div className="relative h-7 flex-1">
                <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${volumeProgress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={audioMetaData.volume}
                  onChange={changeVolume}
                  className="media-range media-range-invisible absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

const rangeStyle = `
  .media-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    border: 0;
    background: transparent;
  }

  .media-range::-moz-range-thumb {
    width: 0;
    height: 0;
    border: 0;
    background: transparent;
  }

  .media-range-invisible::-webkit-slider-runnable-track {
    background: transparent;
  }

  .media-range-invisible::-moz-range-track {
    background: transparent;
  }
`;

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-7 w-7 translate-x-0.5 fill-current"
    aria-hidden="true"
  >
    <path d="M8 5.75v12.5L18 12 8 5.75z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
    <path d="M7.5 6h3.5v12H7.5V6zm5.5 0h3.5v12H13V6z" />
  </svg>
);

const SkipIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-5 w-5 fill-current ${
      direction === "prev" ? "rotate-180" : ""
    }`}
    aria-hidden="true"
  >
    <path d="M5 6.5 13 12l-8 5.5v-11zm8.5 0L21.5 12l-8 5.5v-11z" />
  </svg>
);

const VolumeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
    aria-hidden="true"
  >
    <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4zm10.2-.8a5 5 0 0 1 0 6.6l1.5 1.2a7 7 0 0 0 0-9l-1.5 1.2z" />
  </svg>
);

export default Media;

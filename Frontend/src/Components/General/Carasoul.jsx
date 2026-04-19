import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../Store/Slice/SongSlice";
import { useUsersAllSongs } from "../../ApiData";
import SongList from "./SongList";

const limit = 5;

const Carasoul = ({ artistId }) => {
  const { allSongs, totalRecords, isLoading } = useUsersAllSongs(
    artistId,
    limit,
  );
  const currentPage = useSelector((state) => state.currentPlaying.currentPage);
  const dispatch = useDispatch();
  const totalPage = Math.max(1, Math.ceil(totalRecords / limit));

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [artistId, dispatch]);

  function next() {
    dispatch(setCurrentPage(Math.min(currentPage + 1, totalPage - 1)));
  }

  function prev() {
    dispatch(setCurrentPage(Math.max(currentPage - 1, 0)));
  }

  return (
    <section className="relative flex min-h-[29rem] w-full flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#f8f5fb_0%,#ede9fe_100%)] px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-500">
              Artist Singles
            </p>
            <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
              All Hits
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-violet-700 shadow-[0_12px_26px_rgba(83,61,117,0.12)] transition hover:bg-violet-100"
              title="Previous songs"
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-violet-700 shadow-[0_12px_26px_rgba(83,61,117,0.12)] transition hover:bg-violet-100"
              title="Next songs"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/75 p-3 shadow-[0_18px_45px_rgba(83,61,117,0.14)] backdrop-blur sm:p-4">
          {isLoading && (
            <div className="flex min-h-72 items-center justify-center text-sm font-bold text-violet-700">
              Loading songs...
            </div>
          )}

          {!isLoading && allSongs.length === 0 && (
            <div className="flex min-h-72 items-center justify-center rounded-[22px] border border-dashed border-violet-200 bg-violet-50/50 text-sm font-bold text-slate-500">
              No songs found for this artist.
            </div>
          )}

          {!isLoading && allSongs.length > 0 && (
            <div className="grid gap-3">
              {allSongs.map((song, index) => (
                <SongList key={song._id} value={song} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Carasoul;

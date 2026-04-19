import React, { useEffect, useState } from "react";
import { getAlbumSongs } from "../../ApiData";

const Albums = ({ albumData }) => {
  const [songDet, setSongDet] = useState([]);
  const [showSongs, setShowSongs] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function getSongsfromApi() {
      const album = await getAlbumSongs(albumData._id);

      if (isMounted) {
        setSongDet(album?.songs || []);
      }
    }

    getSongsfromApi();

    return () => {
      isMounted = false;
    };
  }, [albumData._id]);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/20 bg-white/12 shadow-[0_22px_45px_rgba(15,23,42,0.24)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/18">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={albumData.albumImg}
          alt={albumData.albumName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_30%,rgba(15,23,42,0.84)_100%)]" />

        <button
          type="button"
          onClick={() => setShowSongs((prev) => !prev)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur transition hover:bg-white/28"
          title="Show album songs"
        >
          {showSongs ? "x" : "+"}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-200">
            Album
          </p>
          <h3 className="mt-1 truncate text-xl font-black text-white">
            {albumData.albumName}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/70">
            {songDet.length} {songDet.length === 1 ? "song" : "songs"}
          </p>
        </div>
      </div>

      <div className="min-h-28 p-4">
        {showSongs ? (
          <div className="grid gap-2">
            {songDet.length > 0 ? (
              songDet.slice(0, 4).map((song, index) => (
                <div
                  key={song._id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white/12 px-3 py-2 text-sm text-white"
                >
                  <span className="font-bold text-violet-200">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold">
                    {song.Title}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-white/12 px-3 py-3 text-sm font-semibold text-white/75">
                No songs listed yet.
              </p>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowSongs(true)}
            className="flex w-full items-center justify-between rounded-2xl bg-white/12 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-white/18"
          >
            <span>View tracklist</span>
            <span>+</span>
          </button>
        )}
      </div>
    </article>
  );
};

export default Albums;

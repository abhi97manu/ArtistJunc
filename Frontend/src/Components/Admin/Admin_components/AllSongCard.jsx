import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import BlankCard from "./BlankCard";

import SongForm from "./SongForm";
import AlbumForm from "./AlbumForm";
import { SongContext } from "../Admin_Context/Context";
const NewSongCard = lazy(() => import("./NewSongCard"));
import { getTotalAlbums, getUserSongs } from "../../../userApiData";
import AlbumCarasoul from "./AlbumCarasoul";

const loader = <h1>Loading..</h1>;


const AllSongCard = ({ label, value }) => {
  const { isPlaying, setIsPlaying } = useContext(SongContext);

  const [allSongs, setAllSongs] = useState();
  const [delSong, setDelSong] = useState(false);
  const [totalAlbum, setTotalAlbum] = useState(0);
  const [addNew, setAddNew] = useState();
  const [addAlbum, setAddAlbum] = useState(false);

  useEffect(() => {
    const total = async () => {
      const res = await getTotalAlbums();
      setTotalAlbum(res);
    };
 
   

     const getUserSong = async()=>{
    const {data} = await getUserSongs()

    setAllSongs(data)
    }

    getUserSong()
         total();

  }, [addNew, addAlbum,delSong]);

  const onDelBtn = () => {
    setDelSong((prev) => !prev);
  };

  return (
    <section className="mt-7 w-full overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(83,61,117,0.14)]">
      {value == "Songs" && (
        <>
          <div className="flex h-fit items-center justify-between border-b border-violet-100 bg-[linear-gradient(180deg,rgba(243,237,247,0.95)_0%,rgba(255,255,255,1)_100%)] px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500">
                Library
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                {label}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest standalone releases in one clean list.
              </p>
            </div>
            <BlankCard setAddNew={setAddNew} value={`${value}`} />
          </div>
          <div className="max-h-[34rem] w-full overflow-y-auto bg-[#fcfbfe] p-3 sm:p-4">
            <Suspense fallback={loader}>
              <div className="grid gap-3">
                {allSongs?.length > 0 ? (
                  allSongs.map((ele) => (
                    <NewSongCard
                      key={ele._id}
                      songData={ele}
                      isPlaying={isPlaying === ele._id}
                      onClick={() => {
                        setIsPlaying(ele._id);
                      }}
                      setDelSong={onDelBtn}
                    />
                  ))
                ) : (
                  <div className="flex min-h-48 flex-col items-center justify-center rounded-[24px] border border-dashed border-violet-200 bg-white px-6 py-10 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                      <span className="text-xl font-bold">♪</span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      No singles yet
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                      Add your first single to start building your artist
                      library here.
                    </p>
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </>
      )}

      {value == "Album" && (
        <>
          <div className="flex h-fit w-full items-center justify-between border-b border-violet-100 bg-[linear-gradient(180deg,rgba(243,237,247,0.95)_0%,rgba(255,255,255,1)_100%)] p-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500">
                Collection
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                {label}
              </h2>
            </div>
            <BlankCard setAddNew={setAddAlbum} value={`${value} `} />
          </div>

          <AlbumCarasoul itemCount={totalAlbum} />
        </>
      )}
      {addNew && <SongForm setAddNew={setAddNew} />}
      {addAlbum && <AlbumForm songs={allSongs} setAddAlbum={setAddAlbum} />}
    </section>
  );
};

export default AllSongCard;

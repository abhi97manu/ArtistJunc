import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import BlankCard from "./BlankCard";
import axios from "axios";

import SongForm from "./SongForm";
import AlbumForm from "./AlbumForm";
import { SongContext } from "../Admin_Context/Context";
const NewSongCard = lazy(() => import("./NewSongCard"));
import { getTotalAlbums, getUserSongs } from "../../../userApiData";
import AlbumCarasoul from "./AlbumCarasoul";

const loader = <h1>Loading..</h1>;
const serverUrl = import.meta.env.VITE_SERVER_URL;

const AllSongCard = ({ label, value }) => {
  const { isPlaying, setIsPlaying } = useContext(SongContext);

  const [allSongs, setAllSongs] = useState();
  const [allAlbums, setAllAlbums] = useState({});
  const [delSong, setDelSong] = useState(false);
  const [totalAlbum, setTotalAlbum] = useState(0);
  const [addNew, setAddNew] = useState();
  const [addAlbum, setAddAlbum] = useState(false);

  useEffect(() => {
    const total = async () => {
      const res = await getTotalAlbums();
      setTotalAlbum(res);
    };
 
    // axios
    //   .get(`${serverUrl}/admin/userSongs`, { withCredentials: true })
    //   .then((response) => {
      
    //     setAllSongs(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("error : ", error);
    //   });

     const getUserSong = async()=>{
    const {data} = await getUserSongs()

    setAllSongs(data)
    }

    getUserSong()
         total();

  }, [addNew, addAlbum,delSong]);

  const onDelBtn = ()=>{
     setDelSong(prev=>!prev)
  }

  return (
    <div className=" w-full mt-7 p-2 rounded-lg shadow-2xl bg-white">
      {value == "Songs" && (
        <>
         
          <div className=" h-fit flex items-center p-3 justify-between">
            <h2 className="text-2xl  font-bold mx-4 ">{label}</h2>
            <BlankCard setAddNew={setAddNew} value="Add Song" />
          </div>
          <div className="w-full overflow-y-auto h-[30rem] p-4 place-self-center gap-4 items-center ">
            <Suspense fallback={loader}>
            
              {allSongs &&
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
                ))}
            </Suspense>
          </div>
        </>
      )}

      {value == "Album" && (
        <>
          <div className=" h-fit w-full flex items-center p-4 justify-between">
            <h2 className="text-2xl font-bold mx-4">{label}</h2>
            <BlankCard setAddNew={setAddAlbum} value={`Add ${value} `} />
          </div>

          <AlbumCarasoul itemCount={totalAlbum} albums={allAlbums} />
        </>
      )}
      {addNew && <SongForm setAddNew={setAddNew} />}
      {addAlbum && <AlbumForm songs={allSongs} setAddAlbum={setAddAlbum} />}
    </div>
  );
};

export default AllSongCard;

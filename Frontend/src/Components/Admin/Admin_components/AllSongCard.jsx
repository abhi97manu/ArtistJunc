import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import BlankCard from "./BlankCard";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import SongForm from "./SongForm";
import AlbumForm from "./AlbumForm";
import {SongContext} from '../Admin_Context/Context'
const NewSongCard = lazy(() => import("./NewSongCard"));

const loader = <h1>Loading..</h1>;
const serverUrl = import.meta.env.VITE_SERVER_URL;

const AllSongCard = ({ label, value }) => {

  const {isPlaying,setIsPlaying} = useContext(SongContext)


  const [allSongs, setAllSongs] = useState();
  const [allAlbums, setAllAlbums] = useState({});
  const [addNew, setAddNew] = useState();
   const [addAlbum, setAddAlbum] = useState(false);

  useEffect(() => {
    axios
      .get(`${serverUrl}/admin/userSongs`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setAllSongs(response.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });

    axios
      .get(`${serverUrl}/admin/albums`, { withCredentials: true })
      .then((response) => {
       // console.log(response.data);

        setAllAlbums(response.data);
      })
      .catch();
    {
      console.log(" in albums read");
    }
  }, []);



  return (
    <div className=" w-full mt-7 rounded-lg shadow-2xl bg-white">
      {value == "Songs" && (
        <>
          {" "}
          <div className=" h-fit flex items-center p-3 justify-between">
            <h2 className="text-2xl  font-bold mx-4 ">{label}</h2>
            <BlankCard setAddNew={setAddNew} value="Add Song" />
          </div>
          <div className="w-full overflow-y-auto h-[30rem] p-4 place-self-center gap-4 items-center ">
            <Suspense fallback={loader}>
              {" "}
              {allSongs &&
                allSongs.map((ele, i) => (
                  <NewSongCard
                    key={ele._id}
                    songData={ele}
                    isPlaying={isPlaying === ele._id}
                    onClick={() => {
                      setIsPlaying(ele._id);
                    }}
                    setAddNew={setAddNew}
                  />
                ))}
            </Suspense>
          </div>
        </>
      )}

      {value == "Album" && (
        <>
          <div className=" h-fit flex items-center p-4 justify-between">
            <h2 className="text-2xl font-bold mx-4">{label}</h2>
            <BlankCard setAddNew={setAddAlbum} value={`Add ${value} `} />
          </div>
          <div className=" grid grid-cols-3 box-border md:grid-cols-4 p-4 gap-2 md:gap-2 h-72  overflow-y-auto w-full lg:w-[60rem] place-self-center ">
            <Suspense fallback={loader}>
              {" "}
              {Object.entries(allAlbums).map(([key, value]) => {
                

                return <AlbumCard key={key} name={key} data={value} />;
              })}
            </Suspense>
          </div>
        </>
      )}
        {addNew && <SongForm setAddNew={setAddNew} />}
      {addAlbum && <AlbumForm songs={allSongs} setAddAlbum={setAddAlbum} />}
    </div>

     
  );
};

export default AllSongCard;

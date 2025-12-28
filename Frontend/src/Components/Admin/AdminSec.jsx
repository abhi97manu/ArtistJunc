import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { DataContext } from "../../../DataContext";
import Media from "../General/Media";

import ImageKit from "imagekit-javascript";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const AdminSec = () => {
  const { addNew, isPlaying, currentPlaying } = useContext(DataContext);
  const [allSongs, setAllSongs] = useState();
  const [allAlbums, setAllAlbums] = useState({});

  useEffect(() => {
    axios.get(`${serverUrl}/admin/userSongs`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setAllSongs(response.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });

    axios
      .get(`${serverUrl}/albums`)
      .then((response) => {
        setAllAlbums(response.data);
      })
      .catch();
    {
      console.log(" in albums read");
    }
  }, [addNew]);

  return (
    <>
      <div className=" h-fit w-full  ">
        <div className=" w-full ">
          <div className="w-[100%]  h-16 flex items-center">
            <h2 className="text-2xl w-full font-bold mx-4 border-b-2">
              All Songs
            </h2>
          </div>

          <div className="w-full lg:w-[70rem] h-[100%] p-4 place-self-center grid  gap-4 items-center ">
            {allSongs &&
              allSongs.map((ele, i) => <NewSongCard key={i} songData={ele} />)}

            <BlankCard />
          </div>
        </div>

        <div className=" w-full h-full ">
          <div className="w-[100%]  h-16 flex items-center">
            <h2 className="text-2xl w-full font-bold mx-4 border-b-2">
              Albums
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2  lg:gap-6 w-full lg:w-[70rem] place-self-center lg:grid-cols-5 p-5">
            {Object.entries(allAlbums).map(([i, value]) => {
              return <AlbumCard key={i} name={i} list={value} />;
            })}
          </div>
        </div>
      </div>

      {addNew && <SongForm />}
      <Media currentPlaying={currentPlaying} />
    </>
  );
};

export default AdminSec;

const BlankCard = () => {
  const { setAddNew } = useContext(DataContext);
  return (
    <div className="outline-1 outline-dashed h-32 cols-span-1 flex gap-3 justify-center items-center">
      <div className="hover:cursor-pointer" onClick={() => setAddNew(true)}>
        <svg
          className="place-self-center"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />

          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        <p>Add Songs</p>
      </div>
    </div>
  );
};

const SongForm = () => {
  const { setAddNew } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const [songDetail, setSongDetail] = useState({
    Title: "",
    AlbumName: "",
    Feat: "",
    Type: "",
    ImgCover: "",
    SongFile: "",
  });

  function onSubmitHandler(e) {
    e.preventDefault();

    //  setAddNew(false)
    uploadToImageKit();
  }

  function HandleImageFile(e) {
    setSongDetail((prev) => ({ ...prev, ImgCover: e.target.files[0] }));
  }

  function HandleSongFile(e) {
    setSongDetail((prev) => ({ ...prev, SongFile: e.target.files[0] }));
  }

  const uploadToImageKit = async () => {
    try {
      const formdata = new FormData();
      for (const key in songDetail) {
        formdata.append(key, songDetail[key]);
      }

      setLoading(true);
      const res = await axios.post(`${serverUrl}/upload_song`, formdata, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setAddNew(false);
    }
  };

  return (
    <div className="w-full h-full bg-stone-800/60 absolute border-4 text-center flex justify-center ">
      {!loading ? (
        <div
          className="w-72 h-fit place-self-center bg-white rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute place-self-end translate-y-8 -translate-x-2  hover:cursor-pointer "
            onClick={() => setAddNew((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />

              <line x1="8" y1="8" x2="16" y2="16" />
              <line x1="16" y1="8" x2="8" y2="16" />
            </svg>
          </div>
          <form className="grid gap-3 p-4" onSubmit={onSubmitHandler}>
            <h2>Add Your Music</h2>
            <input
              type="text"
              placeholder="Song Title"
              className="border italic p-2"
              value={songDetail.Title}
              onChange={(e) =>
                setSongDetail((prev) => ({ ...prev, Title: e.target.value }))
              }
            />
            <div className="flex text-center items-cetner gap-4">
              <label>
                Single{" "}
                <input
                  type="radio"
                  name="Cover"
                  value="Single"
                  onChange={(e) =>
                    setSongDetail((prev) => ({ ...prev, Type: e.target.value }))
                  }
                />
              </label>
              <label>
                Album{" "}
                <input
                  type="radio"
                  name="Cover"
                  value="Album"
                  onChange={(e) =>
                    setSongDetail((prev) => ({ ...prev, Type: e.target.value }))
                  }
                />
              </label>
            </div>
            {songDetail.Type == "Album" && (
              <input
                type="text"
                placeholder="Album Name"
                className="border italic p-2"
                value={songDetail.AlbumName}
                onChange={(e) =>
                  setSongDetail((prev) => ({
                    ...prev,
                    AlbumName: e.target.value,
                  }))
                }
              />
            )}

            <input
              type="text"
              placeholder="Any Feat."
              className="border italic p-2"
              value={songDetail.Feat}
              onChange={(e) =>
                setSongDetail((prev) => ({ ...prev, Feat: e.target.value }))
              }
            />
            <div className="outline-2 outline-dashed imageFile">
              <label className=" hover:cursor-pointer">
                + Add Music Cover
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={HandleImageFile}
                ></input>
              </label>
            </div>

            <div className="outline-2 outline-dashed audioFile">
              <label className=" hover:cursor-pointer">
                + Add Music File
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={HandleSongFile}
                ></input>
              </label>
            </div>
            <button className="bg-blue-400 rounded-md p-2 text-lg font-semibold cursor-pointer">
              Lets Upload !
            </button>
          </form>
        </div>
      ) : (
        <div className="w-32 h-32 place-self-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <rect
              fill="#ffffffff"
              stroke="#073a86ff"
              stroke-width="5"
              width="30"
              height="30"
              x="25"
              y="50"
            >
              {" "}
              <animate
                attributeName="y"
                calcMode="spline"
                dur="2"
                values="50;120;50;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </rect>
            <rect
              fill="#f7f2f4ff"
              stroke="#073a86ff"
              stroke-width="10"
              width="30"
              height="30"
              x="85"
              y="50"
            >
              <animate
                attributeName="y"
                calcMode="spline"
                dur="2"
                values="50;120;50;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </rect>
            <rect
              fill="#ffffffff"
              stroke="#073a86ff"
              stroke-width="5"
              width="30"
              height="30"
              x="145"
              y="50"
            >
              <animate
                attributeName="y"
                calcMode="spline"
                dur="2"
                values="50;120;50;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </rect>
          </svg>
        </div>
      )}
    </div>
  );
};

const NewSongCard = ({ songData }) => {
  const { setIsPlaying, setCurrentPlaying } = useContext(DataContext);

  function setMediaPlay(audio) {
    setIsPlaying(true);
    setCurrentPlaying(audio);
  }

  async function deleteMedia(audio){
    try{
        const res = await axios.delete(`${serverUrl}/admin/delete_song/${audio._id}`,{withCredentials:true})
         console.log("deleted song ", res);
    }
    catch(err){
      console.log("error in deleting song ", err);
    }
  }

  return (
    <div className="border-b-2 h-12 flex box-border px-2 ">
      <img src={songData.ImageFile} className="  w-12 "></img>
      <div className="grid grid-cols-3 items-center text-center justify-center px-2 w-full">
        <div className="col-span-2 leading-4 items-center px-6 ">
          <div className="flex gap-2 items-center">
            <h1 className="text-md font-extrabold">{songData.Title}</h1>
            <span className="h-1 w-1 rounded-full bg-black"></span>
            <h1 className="text-sm font-medium underline">{songData.Feat}</h1>
          </div>

          <h1 className="text-sm font-light italic place-self-start">
            {songData.Type}
          </h1>
        </div>
        <div className="col-span-1 place-self-end mb-2 flex  gap-2">
          <svg
            fill="#03643fff"
            height="30px"
            width="30px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 492.308 492.308"
            xml:space="preserve"
            onClick={() => setMediaPlay(songData.AudioFile)}
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

          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={()=>deleteMedia(songData)}
            className="hover:cursor-pointer"
          >
            <circle cx="12" cy="12" r="11" stroke="#E53935" stroke-width="1" />
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
  );
};

const AlbumCard = ({ name, list }) => {
  const [showlist, setShowList] = useState(false);
  const { setCurrentPlaying, setIsPlaying } = useContext(DataContext);
  console.log(list);
  return (
    <div
      className="h-62 rounded-2xl col-span-1 text-center grid justify-center  "
      onMouseEnter={() => {
        setShowList(true);
      }}
      onMouseLeave={() => {
        setShowList(false);
      }}
    >
      {!showlist ? (
        <>
          <div
            className={` bg-black w-32 h-32 mt-3 rounded-full border flex justify-center items-center bg-cover bg-center transition-transform rotate-360 linear duration-2000 repeat`}
            style={{ backgroundImage: `url(${list[0].ImageFile})` }}
          >
            <div className="w-8 h-8 bg-red-800 rounded-full text-white bg-gradient-to-b  from-stone-950 from-10% via-stone-200 via-50% to-stone-950 to-90% font-black">
              <svg viewBox="-30 -30 100 100" class="w-8 h-8 ">
                <circle cx="20" cy="20" r="15" fill="#e4dadaff" />
              </svg>
            </div>
          </div>
          {/* <img src = {list[0].ImageFile} className=' w-38 h-38 object-fit rounded-full mt-4'></img> */}
          <h2 className="font-bold text-xl">{name}</h2>
          <h4 className="font-thin text-sm italic">Dotan</h4>
        </>
      ) : (
        <div className="place-self-center  ">
          {list.map((i, e) => {
            console.log(i);
            return (
              <h1
                key={e}
                className="text-black border-b-1 border-blue-400 hover:cursor-pointer hover:text-white"
                onClick={() => {
                  setCurrentPlaying(i.AudioFile);
                  setIsPlaying(true);
                }}
              >
                {i.Title}
              </h1>
            );
          })}
        </div>
      )}
    </div>
  );
};

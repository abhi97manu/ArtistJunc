import React, { useContext, useEffect, useState } from "react";
import axios from "axios";


import Media from "../General/Media";

import ImageKit from "imagekit-javascript";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const AdminSec = () => {
  
   const [addNew, setAddNew] = useState()
  const [isPlaying, setIsPlaying] = useState(null);
  
  const [allSongs, setAllSongs] = useState();
  const [allAlbums, setAllAlbums] = useState({});
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
        console.log(response.data);

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
              allSongs.map((ele, i) => (
                <NewSongCard
                  key={i}
                  songData={ele}
                  isPlaying={isPlaying === i}
                  onClick={() => {
                    setIsPlaying(i);
                  }}
                />
              ))}

            <BlankCard setAddNew = {setAddNew}/>
          </div>
        </div>

        <div className=" w-full h-full ">
          <div className=" w-full h-16 flex items-center">
            <h2 className="text-2xl w-full font-bold mx-4 border-b-2">
              Albums
            </h2>
          </div>
          <div className=" grid grid-cols-3 box-border md:grid-cols-4 p-4  gap-2 md:gap-2 h-72  overflow-y-auto  lg:gap-6 w-full lg:w-[70rem] place-self-center ">
            {Object.entries(allAlbums).map(([key, value]) => {
              console.log("albums", value);

              return (
                <AlbumCard key={key} name={key} data = {value}  />
              );
            })}
            <div className="w-full h-full  bg-white  grid justify-center  text-center">
              <div className="bg-black shadow-2xl w-32 h-32 mt-3 rounded-full border flex justify-center items-center bg-gradient-to-b  from-stone-950 from-10% via-stone-200 via-50% to-stone-950 to-90% ">
                <div className="w-8 h-8 bg-red-800 rounded-full text-white bg-gradient-to-b box-content border-2 border-black  from-stone-950 from-10% via-stone-200 via-50% to-stone-950 to-90% ">
                  <svg viewBox="-30 -30 100 100" class="w-8 h-8 ">
                    <circle cx="20" cy="20" r="15" fill="#e4dadaff" />
                  </svg>
                </div>
              </div>

              <button
                className="hover:cursor-pointer outline outline-dashed shadow-xl bg-indigo-600 rounded-xl text-white"
                onClick={() => setAddAlbum((prev) => !prev)}
              >
                + New Album
              </button>
            </div>
          </div>
        </div>
      </div>

      {addNew && <SongForm  setAddNew= {setAddNew}/>}
      {addAlbum && <AlbumForm songs={allSongs} setAddAlbum={setAddAlbum} />}
     
      {/* <Media currentPlaying={currentPlaying} /> */}
    </>
  );
};

export default AdminSec;

const BlankCard = ({setAddNew}) => {

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

const SongForm = ({setAddNew}) => {
 
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
        console.log("song Upload date ", songDetail[key]);
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

const NewSongCard = ({ songData, isPlaying, onClick }) => {

  const [play, setPlay] = useState(false);

  function setMediaPlay(audio) {
   // setCurrentPlaying(audio);
    onClick();
  }

  async function deleteMedia(audio) {
    try {
      const res = await axios.delete(
        `${serverUrl}/admin/delete_song/${audio._id}`,
        { withCredentials: true }
      );
      console.log("deleted song ", res);
    } catch (err) {
      console.log("error in deleting song ", err);
    }
  }

  return (
    <div className="border-b-2">
      <div className=" h-12 flex box-border px-2 ">
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
            {!isPlaying || !play ? (
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
                onClick={() => {
                  setMediaPlay(songData.AudioFile);
                  onClick;
                  setPlay((prev) => !prev);
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
                fill="#03643fff"
                height="30px"
                width="30px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 492.308 492.308"
                xml:space="preserve"
                onClick={() => {
                  onClick;
                  setPlay((prev) => !prev);
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
        <div className="w-full justify-center items-center gap-2 px-2 flex h-3 bg-blue-200">
          <p className="text-[10px]">2:30</p>
          <input type="range" className="w-full slider"></input>
          <p className="text-[10px]">2:30</p>
        </div>
      )}
    </div>
  );
};

const AlbumCard = ({ name, data}) => {
 // const { setCurrentPlaying, setIsPlaying } = useContext(DataContext);
const [showAlbumlist, setShowAlbumList] = useState(false);
  return (
    <div className="h-62 rounded-2xl  col-span-1 text-center grid justify-center ">
      {
        <>
          <div
            className={` bg-black w-32 h-32 mt-3 rounded-full border flex justify-center items-center bg-cover bg-center transition-transform  hover:rotate-360 ease-in-out  duration-2500 delay-150`}
             style={{ backgroundImage: `url(${data.albumImg})` }}
          >
            <div className="w-8 h-8 bg-red-800 rounded-full text-white bg-gradient-to-b box-content border-3 border-black  from-stone-950 from-10% via-stone-200 via-50% to-stone-950 to-90% font-black">
              <svg viewBox="-30 -30 100 100" class="w-8 h-8 ">
                <circle cx="20" cy="20" r="15" fill="#e4dadaff" />
              </svg>
            </div>
          </div>
          {/* <img src = {list[0].ImageFile} className=' w-38 h-38 object-fit rounded-full mt-4'></img> */}
          <h2
            className="font-bold hover:cursor-pointer hover:underline text-xl"
            onClick={() => setShowAlbumList((prev) => !prev)}
          >
            {data.albumName}
          </h2>
          <h4 className="font-thin text-sm italic">Dotan</h4>
        </>
      }

       {showAlbumlist && <AlbumSongsList songData = {data.songs} albumData = {data} toggleCard = {setShowAlbumList}/>}
    </div>
  );
};

const AlbumForm = ({ songs, setAddAlbum }) => {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState();
  const [coverImg, setCoverImg] = useState();
  const [albumDetails, setAlbumDetails] = useState({
    Title: "",
    AlbumImg: null,
    AlbumSongs: [],
  });

  async function submitAlbum(e) {
    e.preventDefault();
    const formData = new FormData();

    for (const key in albumDetails) {
      if (key === "AlbumSongs") {
        console.log("songs", albumDetails.AlbumSongs);

        albumDetails.AlbumSongs.forEach((v) => {
          formData.append("AlbumSongs", v);
        });
        continue;
      }
      formData.append(key, albumDetails[key]);
    }

    console.log(formData.getAll("AlbumSongs"));

    setLoading(true);
    try {
      const resp = await axios.post(`${serverUrl}/admin/albums`, formData, {
        withCredentials: true,
      });

      console.log(resp.data);
    } catch (err) {
      console.log("error uploaig album", err);
    } finally {
      console.log("FINALLLYYY");

      setLoading(false);
      setAddAlbum(false);
    }
  }

  function addSongsToList(songId) {
    //songId.preventDefault();
    const song = songs.find((s) => s._id === songId);
    console.log("name", song);

    setAlbumSongs((a) => [...a, song.Title]);
    setAlbumDetails((prev) => ({
      ...prev,
      AlbumSongs: [...prev.AlbumSongs, songId],
    }));
    setSelectedSong("");
  }

  console.log("song list ", albumDetails.AlbumSongs);
  return (
    <div
      className="w-full h-full bg-stone-800/60 absolute border-4 text-center flex justify-center "
      onClick={() => setAddAlbum((prev) => !prev)}
    >
      {!loading ? (
        <div
          className="w-72 h-fit place-self-center bg-white rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute place-self-end translate-y-8 -translate-x-2  hover:cursor-pointer "
            onClick={() => setAddAlbum((prev) => !prev)}
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
          <form className="grid gap-3 p-4" onSubmit={(e) => submitAlbum(e)}>
            <h2>Add Your Album</h2>
            <input
              type="text"
              placeholder="Album Title"
              value={albumDetails.Title}
              onChange={(e) =>
                setAlbumDetails((prev) => ({ ...prev, Title: e.target.value }))
              }
              className="border italic p-2"
            />
            <div className="outline-2 outline-dashed imageFile">
              <label className=" hover:cursor-pointer">
                + Add Album Cover
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setCoverImg(e.target.files);
                    setAlbumDetails((prev) => ({
                      ...prev,
                      AlbumImg: e.target.files[0],
                    }));
                  }}
                  className="hidden"
                ></input>
              </label>
            </div>
            {coverImg && (
              <div>
                <img src={coverImg[0].name}></img>
              </div>
            )}

            <div className="flex text-center items-cetner gap-4"></div>

            <div className="flex gap-2">
              <select
                className="w-full"
                value={selectedSong}
                onChange={(e) => setSelectedSong(e.target.value)}
              >
                <option className="text-stone-200 " disabled value="">
                  Pick from List
                </option>
                {songs.map((v, k) => {
                  return (
                    <option key={k} value={v._id}>
                      {v.Title}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                className="bg-blue-300 px-2 rounded text-center text-xl flex items-center hover:cursor-pointer"
                onClick={() => addSongsToList(selectedSong)}
              >
                +
              </button>
            </div>
            <div>
              {albumSongs &&
                albumSongs.map((v, k) => {
                  return (
                    <div key={k} className="p-2 m-2 bg-sky-200 rounded">
                      {v}
                    </div>
                  );
                })}
            </div>

            <button
              type="submit"
              className="bg-blue-400 rounded-md p-2 text-lg font-semibold cursor-pointer"
            >
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

const AlbumSongsList = ({songData, albumData, toggleCard}) => {
  return (
    <div className="w-full h-full bg-stone-800/60 absolute top-0 left-0 items-center text-center flex justify-center " onClick={()=>toggleCard(prev=>!prev)}>
      <div className="">
        <div
          className="w-[28rem] h-fit place-self-center bg-white rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-32 text-start px-4 items-center flex">
            <h1>{albumData.albumName}</h1>
            <img ></img>
          </div>

          {songData.map((value,key)=>{
            return(  <div className="border-t-2 mb-2 p-4 grid grid-cols-5" key = {key}>
            <h1 className="col-span-3">{value.Title}</h1>           
            <h1>Play</h1>           
            <h1>Remove</h1>           
          </div>
            )
          })
        }
          
        </div>
      </div>
    </div>
  );
};

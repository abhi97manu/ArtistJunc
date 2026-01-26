import axios from 'axios';
import React, { useState } from 'react'

const serverUrl = import.meta.env.VITE_SERVER_URL;

const SongForm = ({ setAddNew }) => {
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
      await axios.post(`${serverUrl}/upload_song`, formdata, {
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
    <div className="w-full h-full bg-stone-800/60 absolute top-0 left-0  flex justify-center ">
      {!loading ? (
        <div
          className="w-[80%] md:w-[60%] h-fit place-self-center bg-stone-100  rounded-2xl"
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
            <div className="flex">
              <h2 className="font-bold text-xl ">Add Details</h2>
            </div>

            <div className="outline-2 h-32 flex items-center justify-center outline-dashed imageFile">
              <label className=" hover:cursor-pointer">
                {songDetail?.ImgCover?.name ?? "+Add Music Cover"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={HandleImageFile}
                ></input>
              </label>
            </div>
            <label className='text-sm font-semibold mt-2 leading-2'>Song Title</label>
            <input
              type="text"
              placeholder="Enter song title"
              className="border italic p-2"
              value={songDetail.Title}
              onChange={(e) =>
                setSongDetail((prev) => ({ ...prev, Title: e.target.value }))
              }
            />

            <label className='text-sm font-semibold mt-2 leading-2'>Featured Artist (Optional)</label>
            <input
              type="text"
              placeholder="Eg. Artist Name"
              className="border italic p-2"
              value={songDetail.Feat}
              onChange={(e) =>
                setSongDetail((prev) => ({ ...prev, Feat: e.target.value }))
              }
            />

            <div className="outline-2  h-32 flex items-center justify-center  outline-dashed audioFile">
              <label className=" hover:cursor-pointer">
                {songDetail?.SongFile?.name ?? "+Add Music File"}
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={HandleSongFile}
                ></input>
              </label>
            </div>
            <button className="bg-blue-400 rounded-md p-2 text-lg font-semibold cursor-pointer">
              Upload !
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

export default SongForm
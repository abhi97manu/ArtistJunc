import axios from "axios";
import React, { useState } from "react";

const serverUrl = import.meta.env.VITE_SERVER_URL;

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
      className="w-full h-full bg-stone-800/60 absolute top-0 left-0  flex justify-center "
      onClick={() => setAddAlbum((prev) => !prev)}
    >
      {!loading ? (
        <div
          className="w-[80%] md:w-[60%] h-fit place-self-center bg-white rounded-2xl"
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
          <form className="grid gap-3 p-4 " onSubmit={(e) => submitAlbum(e)}>
            <h2 className="font-bold text-xl">Add Your Album</h2>
            <label className="text-sm font-semibold mt-2 leading-2">
              Album Cover
            </label>
            <div className="outline-2 h-32 flex items-center justify-center outline-dashed z-10">
              <input
                type="file"
                id="add-album-cover"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setCoverImg(e.target.files);
                  setAlbumDetails((prev) => ({
                    ...prev,
                    AlbumImg: e.target.files[0],
                  }));
                }}
              ></input>
              <label
                className=" hover:cursor-pointer h-full w-full items-center flex justify-center"
                for="add-album-cover"
              >
                {coverImg?.[0] ? (
                  <div className=" h-32 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(coverImg[0])}
                      className=" h-full object-cover"
                    ></img>
                  </div>
                ) : (
                  <span className="  ">+ Add Album Cover</span>
                )}
              </label>
            </div>

            <label className="text-sm font-semibold mt-2 leading-2">
              Album Title{" "}
            </label>
            <input
              type="text"
              placeholder="Album Title"
              value={albumDetails.Title}
              onChange={(e) =>
                setAlbumDetails((prev) => ({ ...prev, Title: e.target.value }))
              }
              className="border italic p-2 "
            />

            <div className="flex gap-2 ">
              <select
                className="w-full bg-blue-300 p-2 rounded"
                value={selectedSong ?? null}
                onChange={(e) => setSelectedSong(e.target.value)}
              >
                <option className="text-stone-200 " selected disabled value="">
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
                className={`bg-blue-300 px-2 rounded text-center text-xl flex items-center hover:cursor-pointer ${!selectedSong && "opacity-50 cursor-not-allowed"}`}
                onClick={() => addSongsToList(selectedSong)}
                disabled={!selectedSong}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
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

export default AlbumForm;

import axios from "axios";
import React, { useState } from "react";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const AlbumForm = ({ songs, setAddAlbum }) => {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState("");
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
        albumDetails.AlbumSongs.forEach((v) => {
          formData.append("AlbumSongs", v);
        });
        continue;
      }
      formData.append(key, albumDetails[key]);
    }

    setLoading(true);
    try {
      await axios.post(`${serverUrl}admin/albums`, formData, {
        withCredentials: true,
      });
    } catch (err) {
      console.log("error uploaig album", err);
    } finally {
      setLoading(false);
      setAddAlbum(false);
    }
  }

  function addSongsToList(songId) {
    const song = songs.find((s) => s._id === songId);
    if (!song) return;

    setAlbumSongs((prev) => [...prev, song.Title]);
    setAlbumDetails((prev) => ({
      ...prev,
      AlbumSongs: [...prev.AlbumSongs, songId],
    }));
    setSelectedSong("");
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(34,24,57,0.45)] px-3 py-6 backdrop-blur-sm"
      onClick={() => setAddAlbum(false)}
    >
      {!loading ? (
        <div
          className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(61,41,100,0.22)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-violet-100 bg-[linear-gradient(180deg,rgba(243,237,247,0.95)_0%,rgba(255,255,255,1)_100%)] px-5 py-5 sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white shadow-[0_12px_24px_rgba(109,40,217,0.24)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="M7 9h10" />
                    <path d="M7 13h6" />
                  </svg>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">
                  Build Album
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Create a polished album upload
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Choose artwork, set the title, and bundle songs already in
                  your library.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                onClick={() => setAddAlbum(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 stroke-current"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form className="grid gap-5 p-5 sm:p-7" onSubmit={submitAlbum}>
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <label className="group grid gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  Album Cover
                </span>
                <div className="flex min-h-56 flex-col items-center justify-center rounded-[24px] border border-dashed border-violet-200 bg-violet-50/50 px-5 text-center transition group-hover:border-violet-300 group-hover:bg-violet-50">
                  {coverImg?.[0] ? (
                    <>
                      <div className="h-36 w-36 overflow-hidden rounded-[24px] shadow-md">
                        <img
                          src={URL.createObjectURL(coverImg[0])}
                          className="h-full w-full object-cover"
                          alt="Album cover preview"
                        />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-800">
                        {coverImg[0].name}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-6 w-6 stroke-current"
                          fill="none"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <path d="m7 10 5-5 5 5" />
                          <path d="M12 5v12" />
                        </svg>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-800">
                        Upload album artwork
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Best with square cover art
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setCoverImg(e.target.files);
                    setAlbumDetails((prev) => ({
                      ...prev,
                      AlbumImg: e.target.files[0],
                    }));
                  }}
                />
              </label>

              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Album Title
                  </span>
                  <input
                    type="text"
                    placeholder="Album Title"
                    value={albumDetails.Title}
                    onChange={(e) =>
                      setAlbumDetails((prev) => ({
                        ...prev,
                        Title: e.target.value,
                      }))
                    }
                    className="rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <div className="rounded-[24px] border border-violet-100 bg-[#fcfbfe] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 stroke-current"
                        fill="none"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Add songs to this album
                      </p>
                      <p className="text-xs text-slate-500">
                        Pick songs from your singles list
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <select
                      className="w-full rounded-2xl border border-violet-100 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                      value={selectedSong}
                      onChange={(e) => setSelectedSong(e.target.value)}
                    >
                      <option disabled value="">
                        Pick from all songs
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
                      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition ${
                        selectedSong
                          ? "bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] hover:-translate-y-0.5 hover:brightness-105"
                          : "cursor-not-allowed bg-slate-300 shadow-none"
                      }`}
                      onClick={() => addSongsToList(selectedSong)}
                      disabled={!selectedSong}
                    >
                      Add Song
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-violet-100 bg-[#fcfbfe] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Track list
                  </p>
                  <p className="text-xs text-slate-500">
                    Songs selected for this album
                  </p>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  {albumSongs.length} songs
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {albumSongs.length > 0 ? (
                  albumSongs.map((v, k) => {
                    return (
                      <div
                        key={k}
                        className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {v}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-500">
                    No songs selected yet.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                onClick={() => setAddAlbum(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Upload Album
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex h-52 w-52 flex-col items-center justify-center rounded-[32px] border border-white/60 bg-white/95 shadow-[0_20px_60px_rgba(61,41,100,0.18)]">
          <div className="flex gap-2">
            <span className="h-4 w-4 animate-bounce rounded-full bg-violet-300 [animation-delay:-0.2s]"></span>
            <span className="h-4 w-4 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.1s]"></span>
            <span className="h-4 w-4 animate-bounce rounded-full bg-violet-700"></span>
          </div>
          <p className="mt-6 text-sm font-semibold text-slate-700">
            Building your album...
          </p>
        </div>
      )}
    </div>
  );
};

export default AlbumForm;

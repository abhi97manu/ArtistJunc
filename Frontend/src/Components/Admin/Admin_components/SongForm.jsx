import axios from "axios";
import React, { useState } from "react";

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
      await axios.post(`${serverUrl}upload_song`, formdata, {
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
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(34,24,57,0.45)] px-3 py-6 backdrop-blur-sm"
      onClick={() => setAddNew(false)}
    >
      {!loading ? (
        <div
          className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(61,41,100,0.22)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-violet-100 bg-[linear-gradient(180deg,rgba(243,237,247,0.95)_0%,rgba(255,255,255,1)_100%)] px-5 py-5 sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white shadow-[0_12px_24px_rgba(109,40,217,0.24)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M16 4v9.1a4 4 0 1 1-2-3.46V6.2l7-1.56v7.95a4 4 0 1 1-2-3.46V7.1L16 8V4z" />
                  </svg>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">
                  Upload Single
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Add a new song to your library
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Upload your cover, track file, and key song details in one
                  clean flow.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                onClick={() => setAddNew(false)}
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

          <form className="grid gap-5 p-5 sm:p-7" onSubmit={onSubmitHandler}>
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="group grid gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  Cover Artwork
                </span>
                <div className="flex min-h-48 flex-col items-center justify-center rounded-[24px] border border-dashed border-violet-200 bg-violet-50/50 px-5 text-center transition group-hover:border-violet-300 group-hover:bg-violet-50">
                  {songDetail?.ImgCover ? (
                    <>
                      <div className="h-28 w-28 overflow-hidden rounded-2xl shadow-md">
                        <img
                          src={URL.createObjectURL(songDetail.ImgCover)}
                          alt="Song cover preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-800">
                        {songDetail.ImgCover.name}
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
                        Upload cover image
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        JPG, PNG or WebP
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={HandleImageFile}
                />
              </label>

              <label className="group grid gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  Audio File
                </span>
                <div className="flex min-h-48 flex-col items-center justify-center rounded-[24px] border border-dashed border-violet-200 bg-violet-50/50 px-5 text-center transition group-hover:border-violet-300 group-hover:bg-violet-50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M16 4v9.1a4 4 0 1 1-2-3.46V6.2l7-1.56v7.95a4 4 0 1 1-2-3.46V7.1L16 8V4z" />
                    </svg>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-800">
                    {songDetail?.SongFile?.name || "Upload music file"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    MP3, WAV, M4A and more
                  </p>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={HandleSongFile}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Song Title
                </span>
                <input
                  type="text"
                  placeholder="Enter song title"
                  className="rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  value={songDetail.Title}
                  onChange={(e) =>
                    setSongDetail((prev) => ({
                      ...prev,
                      Title: e.target.value,
                    }))
                  }
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Featured Artist
                </span>
                <input
                  type="text"
                  placeholder="Optional collaborator"
                  className="rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  value={songDetail.Feat}
                  onChange={(e) =>
                    setSongDetail((prev) => ({ ...prev, Feat: e.target.value }))
                  }
                />
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700">
                  Release Type
                </span>
                <input
                  type="text"
                  placeholder="Single, Acoustic, Live version..."
                  className="rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  value={songDetail.Type}
                  onChange={(e) =>
                    setSongDetail((prev) => ({ ...prev, Type: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                onClick={() => setAddNew(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Upload Song
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
            Uploading your track...
          </p>
        </div>
      )}
    </div>
  );
};

export default SongForm;

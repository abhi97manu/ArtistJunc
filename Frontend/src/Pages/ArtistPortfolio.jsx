import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MusicCard from "../Components/General/MusicCard";
import Albums from "../Components/General/Albums";
import Media from "../Components/General/Media";
import Navbar from "../Components/General/Navbar";
import { getAlbums, getArtistById } from "../ApiData";
import Loader from "../Components/Admin/Admin_components/Loader";

const Carosoul = lazy(() => import("../Components/General/Carasoul"));

const ArtistPortfolio = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [discogrph, setDiscograph] = useState([]);
  const [albumPage, setAlbumPage] = useState(0);

  useEffect(() => {
    async function getArtistDetails() {
      if (!artistId) return;

      const data = await getArtistById(artistId);
      setArtist(data || null);
    }

    getArtistDetails();
  }, [artistId]);

  useEffect(() => {
    async function getAlbumDetails() {
      if (!artistId) return;

      const data = await getAlbums(artistId, 8);
      setDiscograph(Array.isArray(data) ? data : []);
      setAlbumPage(0);
    }

    getAlbumDetails();
  }, [artistId]);

  const albumLimit = 4;
  const totalAlbumPages = Math.max(1, Math.ceil(discogrph.length / albumLimit));
  const visibleAlbums = discogrph.slice(
    albumPage * albumLimit,
    albumPage * albumLimit + albumLimit,
  );
  const artistName = artist?.stageName || artist?.artistName || "Artist";

  function nextAlbumPage() {
    setAlbumPage((page) => Math.min(page + 1, totalAlbumPages - 1));
  }

  function prevAlbumPage() {
    setAlbumPage((page) => Math.max(page - 1, 0));
  }

  return (
    <>
      <Navbar />
      <main className="w-full bg-[#f3edf7]">
        <section className="relative min-h-[34rem] overflow-hidden">
          <img
            src="/dotanProfile.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            alt={artistName}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.78)_0%,rgba(15,23,42,0.18)_65%,rgba(15,23,42,0.52)_100%)]" />

          <div className="relative z-1 mx-auto flex min-h-[34rem] w-full max-w-6xl flex-col justify-end px-4 pb-32 pt-28 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/24"
            >
              &lt; Artists
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-200">
              Artist Portfolio
            </p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-none text-white drop-shadow-sm sm:text-6xl">
              {artistName}
            </h1>
            {artist?.bio && (
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white/78">
                {artist.bio}
              </p>
            )}
            {artist?.genre?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {artist.genre.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/16 px-4 py-2 text-sm font-bold text-white backdrop-blur"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>

          <MusicCard artistId={artistId} />
        </section>

        <div className="items-center flex relative">
          <Suspense fallback={<Loader />}>
            <Carosoul artistId={artistId} />
          </Suspense>
        </div>

        <section className="relative min-h-[34rem] overflow-hidden flex justify-center">
          <img
            src="/bg-Mount.jpg"
            className="absolute inset-0 h-full w-full object-cover blur-sm"
            alt=""
          />
          <div className="absolute inset-0 bg-slate-950/35" />

          <div className="relative z-1 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-200">
                  Collection
                </p>
                <h2 className="mt-2 text-4xl font-black text-white drop-shadow-sm sm:text-5xl">
                  Discography
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevAlbumPage}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                  title="Previous albums"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  onClick={nextAlbumPage}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                  title="Next albums"
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleAlbums.length > 0 ? (
                visibleAlbums.map((album) => (
                  <Albums key={album._id} albumData={album} />
                ))
              ) : (
                <div className="col-span-full rounded-[28px] border border-white/20 bg-white/10 p-10 text-center text-white backdrop-blur">
                  No albums found for this artist.
                </div>
              )}
            </div>
          </div>
        </section>
        <Media />
      </main>
    </>
  );
};

export default ArtistPortfolio;

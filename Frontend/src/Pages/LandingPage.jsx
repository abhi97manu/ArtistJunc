import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/General/Navbar";
import { getArtists } from "../ApiData";

const LandingPage = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchArtists() {
      setIsLoading(true);

      const data = await getArtists();
      setArtists(Array.isArray(data) ? data : []);
      setIsLoading(false);
    }

    fetchArtists();
  }, []);

  const filteredArtists = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return artists;

    return artists.filter((artist) => {
      const artistName = `${artist.stageName || ""} ${
        artist.artistName || ""
      }`.toLowerCase();
      const genres = (artist.genre || []).join(" ").toLowerCase();

      return artistName.includes(normalizedSearch) || genres.includes(normalizedSearch);
    });
  }, [artists, searchTerm]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f3edf7]">
        <section className="relative overflow-hidden">
          <img
            src="/dotan-concert.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.82)_0%,rgba(76,29,149,0.5)_52%,rgba(15,23,42,0.7)_100%)]" />

          <div className="relative z-1 mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-200">
              Creatr Directory
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none text-white drop-shadow-sm sm:text-6xl">
              Artists
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/78">
              Explore every artist portfolio, hear their latest singles, and
              jump into their discography.
            </p>

            <div className="mt-8 max-w-xl">
              <label className="sr-only" htmlFor="artist-search">
                Search artists
              </label>
              <input
                id="artist-search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search artist or genre"
                className="w-full rounded-full border border-white/25 bg-white/16 px-5 py-4 text-sm font-bold text-white outline-none backdrop-blur placeholder:text-white/55 focus:border-violet-200 focus:ring-4 focus:ring-white/15"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="rounded-[28px] border border-violet-100 bg-white p-10 text-center text-sm font-bold text-violet-700 shadow-[0_18px_45px_rgba(83,61,117,0.12)]">
              Loading artists...
            </div>
          )}

          {!isLoading && filteredArtists.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-violet-200 bg-white/70 p-10 text-center text-sm font-bold text-slate-500">
              No artists found.
            </div>
          )}

          {!isLoading && filteredArtists.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

const ArtistCard = ({ artist }) => {
  const artistName = artist.stageName || artist.artistName || "Artist";
  const coverImage = artist.latestSong?.ImageFile || "/Logo.jpg";

  return (
    <Link
      to={`/artist/${artist._id}`}
      className="group overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_18px_45px_rgba(83,61,117,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(83,61,117,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={coverImage}
          alt={artistName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_28%,rgba(15,23,42,0.82)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-200">
            Portfolio
          </p>
          <h2 className="mt-1 truncate text-2xl font-black text-white">
            {artistName}
          </h2>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {(artist.genre || []).slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-2 min-h-12 text-sm font-medium leading-6 text-slate-500">
          {artist.bio || "Listen to latest releases and full discography."}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-violet-100 pt-4 text-sm font-bold">
          <span className="text-slate-500">{artist.songCount || 0} songs</span>
          <span className="text-violet-700">{artist.albumCount || 0} albums</span>
        </div>
      </div>
    </Link>
  );
};

export default LandingPage;

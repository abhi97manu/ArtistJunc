import React, { useCallback, useEffect, useRef, useState } from "react";
import AlbumCard from "./AlbumCard";
import { getAlbums } from "../../../userApiData";
import Loader from "./Loader";

const AlbumCarasoul = ({ itemCount = 0 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allAlbums, setAllAlbums] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const scrolling = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function updatePages() {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const nextLimit = isMd ? 4 : 3;

      setLimit(nextLimit);
      setTotalPages(Math.ceil(itemCount / nextLimit));
    }

    updatePages();
    window.addEventListener("resize", updatePages);

    return () => {
      window.removeEventListener("resize", updatePages);
    };
  }, [itemCount]);

  useEffect(() => {
    setCurrentPage((page) => {
      if (totalPages === 0) return 0;
      return Math.min(page, totalPages - 1);
    });
  }, [totalPages]);

  const detectScroll = useCallback(
    (e) => {
      e.preventDefault();

      if (scrolling.current) return;

      const direction = e.deltaY > 0 ? "down" : "up";

      if (direction === "down") {
        setCurrentPage((page) => Math.min(page + 1, totalPages - 1));
      } else {
        setCurrentPage((page) => Math.max(page - 1, 0));
      }

      scrolling.current = true;
      setTimeout(() => {
        scrolling.current = false;
      }, 800);
    },
    [totalPages],
  );

  useEffect(() => {
    async function getalbumData() {
      if (itemCount === 0) {
        setAllAlbums([]);
        setIsLoading(false);
        setHasError(false);
        return;
      }

      const offset = currentPage * limit;
      setIsLoading(true);
      setHasError(false);

      try {
        const albumData = await getAlbums(limit, offset);

        setAllAlbums(Array.isArray(albumData) ? albumData : []);
      } catch (err) {
        console.log("error while getting albums", err);
        setAllAlbums([]);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getalbumData();

    return () => {
      setAllAlbums([]);
    };
  }, [currentPage, itemCount, limit]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", detectScroll, { passive: false });

      return () => {
        container.removeEventListener("wheel", detectScroll);
      };
    }
  }, [detectScroll]);

  return (
    <div className="h-64 w-full overflow-hidden" ref={containerRef}>
      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-dashed border-rose-200 bg-white px-6 py-10 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Albums could not load
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Please try refreshing the dashboard.
          </p>
        </div>
      )}

      {!isLoading && !hasError && allAlbums.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-dashed border-violet-200 bg-white px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
            +
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No albums yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Build your first album to see it here.
          </p>
        </div>
      )}

      {!isLoading && !hasError && allAlbums.length > 0 && (
        <div className="grid h-full w-full grid-cols-3 gap-4 md:grid-cols-4">
          {allAlbums.map((album) => {
            return <AlbumCard key={album._id} data={album} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AlbumCarasoul;

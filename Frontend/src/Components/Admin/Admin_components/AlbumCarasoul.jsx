import React, { useEffect, useRef, useState } from "react";
import AlbumCard from "./AlbumCard";
import { getAlbums } from "../../../userApiData";
import Loader from "./Loader";

const AlbumCarasoul = ({ itemCount = 1, albums }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allAlbums, setAllAlbums] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(4);
  const scrolling = useRef(false);
  const containerRef = useRef(null);
  

 

  useEffect(() => {
    const updatePages = () => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const lengthState = isMd ? 4 : 3;
      setLimit(lengthState);
      setTotalPages(Math.ceil(itemCount / lengthState));
    };

    updatePages(); // run once on mount
  }, [itemCount]);

  const next = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const detectScroll = (e) => {
    e.preventDefault();

    if (scrolling.current) return;

    const direction = e.deltaY > 0 ? "down" : "up";

    if (direction === "down") {
     
      next();
    } else {
    
      prev();
    }
    scrolling.current = true;
    setTimeout(() => {
      scrolling.current = false;
    }, 800);
  };

  useEffect(() => {
    async function getalbumData() {
      const offset = currentPage * limit;
      const albumData = await getAlbums(limit, offset);

    

      setAllAlbums(albumData);
    }
    getalbumData();

    return () => {
      setAllAlbums({});
    };
  }, [currentPage]);

  useEffect(() => {
  

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", detectScroll, { passive: false });

      return () => {
        container.removeEventListener("wheel", detectScroll);
      };
    }
  });

  return (
    <div className="w-full h-64 overflow-hidden bg-white" ref={containerRef}>
      {  
      ( Object.keys(allAlbums).length !== 0) ? Array.from({ length: totalPages }).map(
        (_, index) =>
       ( index === currentPage && (
            <div key = {index} className={` grid grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-300 ease-in-out ${
              index === currentPage
                ? "opacity-100 scale-100 translate-y-0"
                : index < currentPage
                ? "opacity-0 scale-95 -translate-y-12"
                : "opacity-0 scale-95 translate-y-12"
            } w-full h-full`} >
            
            
              {Object.entries(allAlbums).map(([key, value]) => {
                return <AlbumCard key={key} name={key} data={value} />;
              })}
            </div>
          ))
          
      )
    : <Loader/>}
    </div>
  );
};

export default AlbumCarasoul;

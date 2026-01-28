import React, { useCallback, useEffect, useRef, useState } from "react";

const AlbumCarasoul = ({ itemCount=5 }) => {

  
  
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
  const scrolling = useRef(false);
  const containerRef = useRef(null);


  useEffect(() => {
    const updatePages = () => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const lengthState = isMd ? 4 : 3;
      setTotalPages(Math.ceil(itemCount / lengthState));
    };

    updatePages(); // run once on mount
  }, [itemCount]);
  
  const next = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const detectScroll = (e) => {
    e.preventDefault();
console.log("total", totalPages,currentPage);
    if (scrolling.current) return;

    const direction = e.deltaY > 0 ? 'down' : 'up';

    

    if (direction === 'down') {
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
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", detectScroll, { passive: false });
      
      return () => {
        container.removeEventListener("wheel", detectScroll);
      };
    }
  }, [currentPage]);

  return (
    <div
      className="w-full h-64 overflow-hidden bg-white"
      ref={containerRef}
    >
      {Array.from({ length: totalPages }).map((_, index) => (
        index === currentPage &&(  <div
          key={index}
          className={`h-full  border flex items-center justify-center text-6xl 
           "bg-red-200" 
          }`}
        >
      
          {index}
        </div>) 
        
      ))}
    </div>
  );
};

export default AlbumCarasoul;

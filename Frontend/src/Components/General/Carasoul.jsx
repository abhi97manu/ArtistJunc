import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../Store/Slice/SongSlice';
import useUsersAllSongs from '../../ApiData';
import SongList from './SongList';

const Carasoul = () => {

      const { allSongs, totalRecords } = useUsersAllSongs();
      const currentPage = useSelector((state)=>state.currentPlaying.currentPage);

  const dispatch = useDispatch();
     
      const limit = 5;
      const totalPage = Math.ceil(totalRecords / limit);
    
      console.log("tOTAL Page : ", totalPage);
    
      // carasoul functions
      const next = () => {
        
        dispatch(setCurrentPage(currentPage === totalPage - 1 ? totalPage - 1 : currentPage + 1))
      };
    
      const prev = () => {
        
        dispatch(setCurrentPage(currentPage <= 0 ? 0 : currentPage - 1))
      };
    
  return (
    <div className=" h-fit flex w-full items-center bg-stone-500 relative">
           
        
        <div className="flex h-full w-full overflow-x-auto">

              {Array.from({ length: totalPage }, (_, i) => (
                <div
                  className="w-full h-full p-4 bg-stone-800 flex-shrink-0  transition-transform ease-in-out duration-500"
                  style={{ transform: `translateX(-${currentPage * 100}%)` }}
                  key={i}
                >
                  {allSongs.map((v) => {
                    return <SongList key={v._id} value={v} />;
                  })}
                </div>
              ))}
            </div>
            <div className="w-full flex absolute justify-between">
              <button onClick={() => prev()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M15.5 19.5L8 12l7.5-7.5z" />
                </svg>
              </button>

              <button onClick={() => next()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M8.5 4.5L16 12l-7.5 7.5z" />
                </svg>
              </button>
            </div>
              </div>
            
  )
}

export default Carasoul
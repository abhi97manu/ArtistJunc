import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../Store/Slice/SongSlice';
import {useUsersAllSongs} from '../../ApiData';
import SongList from './SongList';

const Carasoul = () => {

      const { allSongs, totalRecords } = useUsersAllSongs();
      const currentPage = useSelector((state)=>state.currentPlaying.currentPage);

  const dispatch = useDispatch();
     
      const limit = 5;
      const totalPage = Math.ceil(totalRecords / limit);
    
      console.log("Current Page : ", allSongs.length);
    
      // carasoul functions
      const next = () => {
        
        dispatch(setCurrentPage(currentPage === totalPage - 1 ? totalPage - 1 : currentPage + 1))
      };
    
      const prev = () => {
        
        dispatch(setCurrentPage(currentPage <= 0 ? 0 : currentPage - 1))
      };
    
  return (
    <div className=" h-[28rem] flex flex-col w-full p-2   justify-center relative">
         
         <h1 className='text-5xl font-bold  px-6 m-3 text-transparent bg-linear-to-r from-stone-100 to-stone-900 bg-clip-text'> All Hits</h1>
         
        <div className="flex h-full w-full   overflow-x-hidden">
          

              {Array.from({ length: totalPage }, (_, i) => (
                <div
                  className="w-full h-full px-7 z-[0]  flex-shrink-0  transition-transform ease-in-out duration-150"
                  style={{ transform: `translateX(-${currentPage * 100}%)` }}
                  key={i}
                >
                  {allSongs.map((v) => {
                                     
                   return <SongList key={v._id} value={v} />;
                  })}
                </div>
              ))}
            </div>
            
              <button onClick={() => prev()} className='absolute left-1 hover:scale-125 text-stone-300 hover:text-stone-700' >
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

              <button onClick={() => next()}  className='absolute right-1 hover:scale-125 text-stone-300 hover:text-stone-700'>
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
            
  )
}

export default Carasoul
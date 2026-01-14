import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "./Store/Slice/SongSlice";


const Server_URL = import.meta.env.VITE_SERVER_URL;
const type = "Single";


export function useUsersAllSongs() {
  const currPage = useSelector((state)=>state.currentPlaying.currentPage)
  const [allSongs, setAllSongs] = useState([]);
  const [totalRecords, setTotalRecords] = useState()
  useEffect(() => {
    const getSongsData = async () => {
      try {
        const data = await axios.get(`${Server_URL}/getAllSongs/${type}?limit=5&page=${currPage}`);
        setAllSongs(data.data.Songs);
        setTotalRecords(data.data.count)

      console.log(data.data.Songs, currPage);
        
      } catch (ERR) {
        console.log(ERR, "error");
        
      }
    };
  getSongsData()
  },[currPage]);

  return {allSongs,totalRecords};
}


export  function useGetSong() {
  const dispatch = useDispatch()

  

 async function getClickedSong(songId){
  console.log("getClickedSong",songId);
  
    try {
      const data = await axios.get(`${Server_URL}/getSong/${songId}`);

      const retreived_song_details = data.data.data;
      
      dispatch(setCurrentSong(retreived_song_details))
    
    } catch (err) {
      console.log(err);
    }
  }
 return{getClickedSong}
  }
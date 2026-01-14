import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Server_URL = import.meta.env.VITE_SERVER_URL;
const type = "Single";



function useUsersAllSongs() {
  const currPage = useSelector((state)=>state.currentPlaying.currentPage)
  const [allSongs, setAllSongs] = useState([]);
  const [totalRecords, setTotalRecords] = useState()
  useEffect(() => {
    const getSongsData = async () => {
      try {
        const data = await axios.get(`${Server_URL}/getAllSongs/${type}?limit=5&page=${currPage}`);
        setAllSongs(data.data.Songs);
        setTotalRecords(data.data.count)

      console.log(data.data.count);
        
      } catch (ERR) {
        console.log(ERR, "error");
        
      }
    };
  getSongsData()
  },[currPage]);

  return {allSongs,totalRecords};
}
export default useUsersAllSongs;

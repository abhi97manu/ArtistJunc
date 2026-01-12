import axios from "axios";
import { useEffect, useState } from "react";


const Server_URL = import.meta.env.VITE_SERVER_URL;
const type = "Single";

function useUsersAllSongs() {
  const [allSongs, setAllSongs] = useState([]);
  useEffect(() => {
    const getSongsData = async () => {
      try {
        const data = await axios.get(`${Server_URL}/getAllSongs/${type}`);
        setAllSongs(data.data.Songs);
       // console.log(data.data);
        
      } catch (ERR) {
        console.log(ERR, "error");
        
      }
    };
  getSongsData()
  },[]);

  return {allSongs};
}
export default useUsersAllSongs;

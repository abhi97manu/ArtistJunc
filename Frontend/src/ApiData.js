import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "./Store/Slice/SongSlice";


const Server_URL = import.meta.env.VITE_SERVER_URL || "";
const ApiBase = Server_URL.endsWith("/") ? Server_URL : `${Server_URL}/`;
//const type = "Single";


export function useUsersAllSongs(artistId, limit = 5) {
  const currPage = useSelector((state)=>state.currentPlaying.currentPage)
  const [allSongs, setAllSongs] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getSongsData = async () => {
      if (!artistId) return;

      setIsLoading(true);
      try {
        const data = await axios.get(`${ApiBase}getAllSongs/${artistId}?limit=${limit}&page=${currPage}&type=Single`);
        setAllSongs(data.data.Songs);
        setTotalRecords(data.data.count)
        
      } catch (ERR) {
        console.log(ERR, "error");
      } finally {
        setIsLoading(false);
      }
    };
  getSongsData()
  },[artistId, currPage, limit]);

  return {allSongs,totalRecords,isLoading};
}


export  function useGetSong() {
  const dispatch = useDispatch()

  

 async function getClickedSong(songId){
    try {
      const data = await axios.get(`${ApiBase}getSong/${songId}`);

      const retreived_song_details = data.data.data;
      
      dispatch(setCurrentSong(retreived_song_details))
    
    } catch (err) {
      console.log(err);
    }
  }
 return{getClickedSong}
  }





  export async function getLatestSong(artistId = ""){
    try{
      const query = artistId ? `?artistId=${artistId}` : "";
      const response = await axios.get(`${ApiBase}getRecentSong${query}`)
      if(!response)
        console.log("no data");
      return response.data
        
    }
  catch(err)
  {
    console.log(err);
    
  }
   

  }

  export async function getArtists(){
    try{
        const response = await axios.get(`${ApiBase}artists`)
            return response.data
    }
    catch(err){
        console.log(err);
    }
  }

  export async function getArtistById(artistId){
    try{
        const response = await axios.get(`${ApiBase}artists/${artistId}`)
            return response.data
    }
    catch(err){
        console.log(err);
    }
  }


  export async function getAlbums(artistId, limit = 8, page = 0){
    try{
        const query = artistId ? `?artistId=${artistId}&limit=${limit}&page=${page}` : "";
        const response = await axios.get(`${ApiBase}albums/allAlbums${query}`)
            return response.data
    }
    catch(err){
        console.log(err);
        
    }
  }

  export async function getAlbumSongs(id){
    try{
      const resp = await axios.get(`${ApiBase}albums/albumSong?search=${id}`)
            return resp.data
    }
     catch(err){
        console.log(err);
        
    }

  }

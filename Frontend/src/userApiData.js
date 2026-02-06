import axios from "axios";

const Server_URL = import.meta.env.VITE_SERVER_URL;

export async function getAlbums(limit, offset){
    try{
        const resp = await axios.get(`${Server_URL}/admin/albums?limit=${limit}&&offset=${offset}`,{withCredentials:true});
         console.log(resp.data);
        return resp.data;
      
        
    }
    catch(err){
        console.log(err);
    }
}

export async function getTotalAlbums(){
    try{
        const resp = await axios.get(`${Server_URL}/admin/albums/totalablums`,{withCredentials:true});
        console.log(resp.data.totalAlbums);
        
        return  resp.data.totalAlbums;
    }
    catch(err){
        console.log(err);}
}

export async function getUserSongs(){
    try {
      const resp = await   axios.get(`${Server_URL}/admin/userSongs`, { withCredentials: true })
     
      console.log("data", resp.data.length);
      
      return {data : resp.data , totalLength : resp.data.length}
      

    }
    catch(err)
    {
 console.log("error : ", err);
    }
}



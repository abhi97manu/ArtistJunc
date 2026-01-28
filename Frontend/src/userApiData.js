import axios from "axios";

const Server_URL = import.meta.env.VITE_SERVER_URL;

export async function getAlbums(limit, offset){
    try{
        const resp = await axios.get(`${Server_URL}/albums?limit=${limit}&&offset=${offset}`)
    }
    catch(err){
        console.log(err);
    }
}

export async function getTotalAlbums(){
    try{
        const resp = await axios.get(`${Server_URL}/admin/albums/totalablums`,{withCredentials:true});
        console.log(resp.data.totalAlbums);
        
        return resp.data.totalAlbums;
    }
    catch(err){
        console.log(err);}
}


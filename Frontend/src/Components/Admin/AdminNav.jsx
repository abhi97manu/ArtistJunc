import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



const AdminNav = () => {

  const navigate = useNavigate()

  async function Logout(){
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`, {},{
       
        withCredentials:true,
      })

      if(res.status === 200){
        console.log(res.data.message);
        
       navigate('/')
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='relative w-full h-24 bg-blue-900 col-span-4 border text-center flex items-center justify-center text-white font-bold text-2xl'>
        <h1 className='hover: cursor-pointer' onClick={()=>Logout()}>Logout</h1>
    </div>
  )
}

export default AdminNav
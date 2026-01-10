import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'



const AdminNav = () => {

  const navigate = useNavigate()

  async function Logout(){
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/logout`, {},{
       
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
    <div className='relative w-full h-24 bg-blue-900 col-span-4 border  flex gap-8 items-center justify-center text-white  '>
        <NavLink to = "/dashboard">Home</NavLink>
        <h1 className='text-6xl font-bold -translate-y-3'>Dotan</h1>
        <h5 className='hover: cursor-pointer' onClick={()=>Logout()}>Logout</h5>
    </div>
  )
}

export default AdminNav
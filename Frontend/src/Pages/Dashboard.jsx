import React, { useEffect, useState } from 'react'
import AdminNav from '../Components/Admin/AdminNav'
import AdminSide from '../Components/Admin/AdminSide'
import AdminSec from '../Components/Admin/AdminSec'
import axios from 'axios'
import { Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom'




const Dashboard = () => {

  const navigate = useNavigate()
  const recent_ck = cookieStore.get("token")
  console.log("cookie ", recent_ck);
  
 
  useEffect(()=>{
    async function getUSer(){
      try{
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/profile`,{
          withCredentials:true,
        })
         
          
     }
      catch(err){
        console.log(err);
      
        navigate('/')
      }
       
  
  }
    getUSer()
},[])

  return (
<>
    {
      (
     
     
        <div className=' w-full min-h-full relative '>
            <AdminNav/>
        <div className='flex w-full h-full relative '>
         
         <AdminSide/>
          <Outlet/>
       
        
        </div>
    </div>
  )}
  </> 
  )
}

export default Dashboard
import React, { useEffect, useState } from 'react'
import AdminNav from '../Components/Admin/AdminNav'
import AdminSide from '../Components/Admin/AdminSide'
import AdminSec from '../Components/Admin/AdminSec'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'




const Dashboard = () => {

  const navigate = useNavigate()
 
  useEffect(()=>{
    async function getUSer(){
      try{
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`,{
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
     
     
        <div className=' w-full h-full lg:h-screen  relative '>
        <AdminNav/>
        <div className='flex w-full h-full  '>
        <AdminSide/>
       
        <AdminSec/>
        
        </div>
    </div>
  )}
  </> 
  )
}

export default Dashboard
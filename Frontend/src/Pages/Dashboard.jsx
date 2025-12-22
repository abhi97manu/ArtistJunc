import React from 'react'
import AdminNav from '../Components/AdminNav'
import AdminSide from '../Components/AdminSide'
import AdminSec from '../Components/AdminSec'
import DataProvider from '../DataProvider'



const Dashboard = () => {
  return (
    <div className=' w-full h-full  relative '>
        <AdminNav/>
        <div className='flex w-full h-full  '>
        <AdminSide/>
        <DataProvider>
            <AdminSec/>
        </DataProvider>
        </div>
    </div>
  )
}

export default Dashboard
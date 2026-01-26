import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSide = () => {
  return (
    <div className=' lg:w-[20%] text-center p-2 hidden lg:flex flex-col  gap-4 lg:border-r-2'>
      <h1 className='text-xl py-2 font-bold bg-blue-500'>Quick Lookout</h1>
      <div className=' p-2 grid gap-4'>

        <NavLink to = "/Dashboard" className='hover:bg-blue-300 p-3 flex h-[3rem] gap-2 items-center ' >
        <img src = "./dashboard.svg" className='h-full'></img>
        <h1 className='text-md font-bold'>Dashboard</h1>
        </NavLink>
        <NavLink to="" className='hover:bg-blue-300 p-3 flex h-[3rem] gap-2 items-center '>
           <img src = "./chart.svg" className='h-full'></img>
        <h1 className='text-md font-bold'>Charts</h1>
        </NavLink>
        <NavLink to="manageTours" className='hover:bg-blue-300 p-3 flex h-[3rem] gap-2 items-center '>
           <img src = "./tour.svg" className='h-full'></img>
        <h1 className='text-md font-bold'>Tour Manager</h1>
        </NavLink>
        <NavLink to="" className='hover:bg-blue-300 p-3 flex h-[3rem] gap-2 items-center '>
           <img src = "./setting.svg" className='h-full'></img>
        <h1 className='text-md font-bold'>Settings</h1>
        </NavLink>

      </div>
    </div>
  )
}

export default AdminSide
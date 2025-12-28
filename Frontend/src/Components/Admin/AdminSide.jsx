import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSide = () => {
  return (
    <div className=' w-[14rem] text-center p-2 hidden md:flex md:flex-col gap-4 border relative'>
      <h1 className=''>Quick Lookout</h1>
      <div className=' p-2 grid gap-4'>

        <h2 className='border-b-1'>Charts</h2>
        <NavLink to="manageTours" className='border-b-1'>Manage Tours</NavLink>

      </div>
    </div>
  )
}

export default AdminSide
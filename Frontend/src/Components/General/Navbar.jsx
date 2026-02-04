import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=" absolute  w-full absolute fixed  text-zinc-100 flex justify-between z-1 items-center px-10 py-4">
        <div className='LogoFont lg:text-6xl font-semibold text-4xl'>
            <h1>Creatr</h1>
        </div>
        <div className='flex gap-5 text-xl text-stone-300 -translate-x-10 LogoFont'>
           <NavLink to = '/login'>Artist</NavLink>
            
        </div>
    </div>
  )
}

export default Navbar
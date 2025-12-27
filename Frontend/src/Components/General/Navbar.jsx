import React from 'react'

const Navbar = () => {
  return (
    <div className=" absolute  w-full absolute fixed  text-zinc-300 flex justify-between z-1 items-center px-10 py-4">
        <div className='LogoFont lg:text-6xl text-2xl'>
            <h1>Dotan</h1>
        </div>
        <div className='flex gap-5 text-2xl -translate-x-10 LogoFont'>
            <h4 className=''>Store</h4>
            <h4>Join</h4>
        </div>
    </div>
  )
}

export default Navbar
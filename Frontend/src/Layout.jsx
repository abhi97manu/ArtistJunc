import React from 'react'




import Router from './Routes/Router.jsx'
import { Outlet, RouterProvider } from 'react-router-dom'

const Layout = () => {
  return (
    < >
  <div className='min-h-screen'>
      <RouterProvider router={Router}>
      
       <Outlet/>
          
      </RouterProvider>
   </div>


    </>
  )
}

export default Layout
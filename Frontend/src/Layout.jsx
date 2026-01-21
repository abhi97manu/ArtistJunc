import React from 'react'




import Router from './Routes/Router.jsx'
import { Outlet, RouterProvider } from 'react-router-dom'

const Layout = () => {
  return (
    < >
  
      <RouterProvider router={Router}>
      
       <Outlet/>
          
      </RouterProvider>
   


    </>
  )
}

export default Layout
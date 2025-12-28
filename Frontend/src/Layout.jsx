import React from 'react'


import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import DataProvider from './DataProvider'
import Register from './Pages/Register' 
import Router from './Components/Routes/Router.jsx'
import { Outlet, RouterProvider } from 'react-router-dom'

const Layout = () => {
  return (
    < >
     <DataProvider>
      <RouterProvider router={Router}>
       
        {/* <LandingPage/> */}
     


     {/* Admin */}

      <Outlet/>
             {/* <Dashboard/>
            <Register/> */}
      </RouterProvider>
    </DataProvider>


    </>
  )
}

export default Layout
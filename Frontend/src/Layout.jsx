import React from 'react'


import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import DataProvider from './DataProvider'
import Register from './Pages/Register' 
import Router from './Router'
import { RouterProvider } from 'react-router-dom'

const Layout = () => {
  return (
    < >
     <DataProvider>
      <RouterProvider router={Router}>
       
        <LandingPage/>
     


     {/* Admin */}

  
             <Dashboard/>
            <Register/>
      </RouterProvider>
    </DataProvider>


    </>
  )
}

export default Layout
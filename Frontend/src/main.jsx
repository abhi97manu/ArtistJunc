import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Layout from './Layout.jsx'

import Router from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <Layout />
   
  </StrictMode>,
)

import {createBrowserRouter} from 'react-router-dom'
import Register from './Pages/Register'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard';


const Router = createBrowserRouter([
    {   
        path: "/",
        element: <Register/>,
    },
    {
        path: "/Dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/landing",
        element: <LandingPage/>,
    }

]);
export default Router
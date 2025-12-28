import { createBrowserRouter } from "react-router-dom";
import Register from "../../Pages/Register";
import LandingPage from "../../Pages/LandingPage";
import Dashboard from "../../Pages/Dashboard";
import ManageTours from "../Admin/ManageTours";
import AdminSec from "../Admin/AdminSec";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    children:[
      {
        path: "",
        index:true,
        element: <AdminSec/>,
      },
       {
        path: "charts",
       // element: <Charts />,
      },
      {
        path: "manageTours",
        element: <ManageTours />,
      },
    ]
   
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
]);
export default Router;

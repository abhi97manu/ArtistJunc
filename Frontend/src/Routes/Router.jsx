import { createBrowserRouter } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loader from "../Components/Admin/Admin_components/Loader";

const Register = lazy(() => import("../Pages/Register"));
const LandingPage = lazy(() => import("../Pages/LandingPage"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const ManageTours = lazy(() => import("../Components/Admin/ManageTours"));
const AdminSec = lazy(() => import("../Components/Admin/AdminSec"));

const loader = (<h1>Loading..</h1>)

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense  fallback = {<Loader/>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/Dashboard",
    element: (
      <Suspense  fallback = {<Loader/>}>
    <Dashboard />
    </Suspense>
  ),
    children: [
      {
        path: "",
        index: true,
        element: 
       
        <AdminSec  />
     
      },
      {
        path: "charts",
        // element: <Charts />,
      },
      {
        path: "manageTours",
        element: (<Suspense fallback = {<Loader/>}><ManageTours /></Suspense>),
      },
    ],
  },
  {
    path: "/landing",
    element:(<Suspense fallback = {<Loader/>}> <LandingPage /></Suspense>),
  },
]);
export default Router;

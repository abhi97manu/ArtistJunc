import { createBrowserRouter } from "react-router-dom";

import { lazy, Suspense } from "react";

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
      <Suspense  fallback = {loader}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/Dashboard",
    element: (
      <Suspense  fallback = {loader}>
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
        element: (<Suspense fallback = {loader}><ManageTours /></Suspense>),
      },
    ],
  },
  {
    path: "/landing",
    element:(<Suspense fallback = {loader}> <LandingPage /></Suspense>),
  },
]);
export default Router;

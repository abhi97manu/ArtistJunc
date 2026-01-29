import React, { useEffect, useState } from "react";
import AdminNav from "../Components/Admin/AdminNav";
import AdminSide from "../Components/Admin/AdminSide";

import axios from "axios";
import {
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import SongProvider from "../Components/Admin/Admin_Context/Context.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const recent_ck = cookieStore.get("token");
  console.log("cookie ", recent_ck);

  useEffect(() => {
    async function getUSer() {
      try {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/profile`, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);

        navigate("/");
      }
    }
    getUSer();
  }, []);

  return (
    <>
      <div className=" w-full h-full relative  ">
        <AdminNav />
        <div className="flex w-full h-full relative bg-zinc-200 ">
          <SongProvider>
            <AdminSide />
            <Outlet />
          </SongProvider>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

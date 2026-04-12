import React, { useEffect, useState } from "react";
import AdminNav from "../Components/Admin/AdminNav";

import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import SongProvider from "../Components/Admin/Admin_Context/Context.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    async function getUSer() {
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}admin/profile`,
          {
            withCredentials: true,
          },
        );

        if (!user?.data) {
          navigate("/login");
          return;
        }

        setArtist(user.data);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    }
    getUSer();
  }, [navigate]);

  return (
    <>
      <div className="w-full h-full relative">
        <AdminNav artist={artist} />
        <div className="flex w-full h-full relative bg-zinc-200">
          <SongProvider>
            <Outlet />
          </SongProvider>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

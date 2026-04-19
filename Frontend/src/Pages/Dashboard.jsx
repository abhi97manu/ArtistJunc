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
    <div className="relative min-h-screen w-full bg-[#f3edf7]">
      <div className="mx-auto flex min-h-screen w-full flex-col">
        <AdminNav artist={artist} />
        <div className="flex flex-1 justify-center bg-[linear-gradient(180deg,#f3edf7_0%,#ede9fe_100%)] px-3 pb-6 sm:px-5 lg:px-8">
          <SongProvider>
            <div className="w-full max-w-6xl">
              <Outlet />
            </div>
          </SongProvider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

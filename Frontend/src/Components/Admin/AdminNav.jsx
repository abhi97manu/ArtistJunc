import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: "./dashboard.svg",
  },
  {
    label: "Charts",
    to: "/dashboard/charts",
    icon: "./chart.svg",
  },
  {
    label: "Tour Manager",
    to: "/dashboard/manageTours",
    icon: "./tour.svg",
  },
  {
    label: "Settings",
    to: "/dashboard/settings",
    icon: "./setting.svg",
  },
];

const AdminNav = ({ artist }) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    function handleSyncLogout(e) {
      if (e.key === "logout" && e.newValue) {
        navigate("/login");
      }
    }

    window.addEventListener("storage", handleSyncLogout);

    return () => {
      window.removeEventListener("storage", handleSyncLogout);
    };
  }, [navigate]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsProfileMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function Logout() {
    setIsProfileMenuOpen(false);
    localStorage.setItem("logout", Date.now());
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}admin/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        console.log(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="w-full h-fit bg-[#f3edf7] px-3 py-4 sm:px-5 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 rounded-[28px] border border-white/70 bg-white px-4 py-4 shadow-[0_18px_40px_rgba(83,61,117,0.14)] sm:px-6">
          <NavLink
            to="/dashboard"
            className="flex min-w-0 items-center gap-3 rounded-full transition hover:opacity-90"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-sm font-black text-white shadow-lg shadow-violet-200">
              C
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Creatr</p>
              <p className="text-xs text-slate-400">Artist Workspace</p>
            </div>
          </NavLink>

          <div className="hidden flex-1 items-center justify-center gap-2 lg:flex xl:gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-violet-100 text-violet-700"
                      : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="hidden items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition hover:brightness-105 lg:inline-flex"
              onClick={() => Logout()}
            >
              Logout
            </button>

            <button
              type="button"
              className="text-right"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Artist
              </p>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                {artist?.stageName || artist?.artistName || "Your Profile"}
              </h2>
              {artist?.artistName && artist?.stageName && (
                <p className="text-sm text-slate-500">{artist.artistName}</p>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/30 transition duration-300 lg:hidden ${
          isProfileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsProfileMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[84vw] max-w-sm flex-col bg-white px-5 py-6 shadow-[-18px_0_40px_rgba(15,23,42,0.18)] transition-transform duration-300 lg:hidden ${
          isProfileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Your Profile
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {artist?.stageName || artist?.artistName || "Artist"}
            </h2>
            {artist?.artistName && artist?.stageName && (
              <p className="mt-1 text-sm text-slate-500">{artist.artistName}</p>
            )}
          </div>
          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
            onClick={() => setIsProfileMenuOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "bg-slate-50 text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                }`
              }
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <img
                src={item.icon}
                className="h-5 w-5 object-contain"
                alt={item.label}
              />
              <span className="text-sm font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="mt-auto inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition hover:brightness-105"
          onClick={() => Logout()}
        >
          Logout
        </button>
      </aside>
    </>
  );
};

export default AdminNav;

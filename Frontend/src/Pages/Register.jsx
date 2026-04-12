import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [showHint, setShowHint] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  console.log(import.meta.env.VITE_SERVER_URL);
  const passwordValue = watch("password");

  async function onSubmit(data) {
    try {
      setError("");

      const endpoint =
        authMode === "register" ? "admin/register" : "admin/login";

      const payload =
        authMode === "register"
          ? {
              artistName: data.artistName,
              stageName: data.stageName,
              genre: data.genre,
              bio: data.bio,
              email: data.email,
              password: data.password,
            }
          : {
              email: data.email,
              password: data.password,
            };

            console.log("Payload being sent to server:", payload);
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
        payload,
        {
          withCredentials: true,
        },
      );

      if (result.status === 200 || result.status === 201) {
        navigate("/Dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-100 px-6 py-12 lg:px-8">
      <div className="relative w-[18rem] lg:w-[32rem]">
        <img src="./Logo.jpg" alt="Logo belongs here" />
        <h1 className="absolute top-[38%] right-6 flex place-self-end bg-gradient-to-r from-stone-400 to-zinc-100 bg-clip-text text-4xl font-black text-transparent [-webkit-text-stroke:0.3px_gray] lg:text-7xl">
          CREATR
        </h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          {authMode === "login" ? "Artist sign in" : "Artist registration"}
        </h2>
        <p className="mt-2 text-center text-sm text-stone-500">
          {authMode === "login"
            ? "Access your dashboard to manage songs, albums and tours."
            : "Create your artist account and start managing your music."}
        </p>
      </div>

      <div className="mt-10 w-full max-w-md rounded-2xl bg-white p-6 text-stone-600 shadow-lg shadow-stone-200/70">
        <div className="mb-6 grid grid-cols-2 rounded-xl bg-stone-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode("login");
              setError("");
              setShowHint(false);
              reset();
            }}
            className={`rounded-lg px-4 py-2 transition ${
              authMode === "login"
                ? "bg-indigo-500 text-white"
                : "text-stone-600"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("register");
              setError("");
              setShowHint(false);
              reset();
            }}
            className={`rounded-lg px-4 py-2 transition ${
              authMode === "register"
                ? "bg-indigo-500 text-white"
                : "text-stone-600"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 flex justify-center rounded-md border bg-red-400 px-3 py-2 text-white">
            <h1>{error}</h1>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {authMode === "register" && (
            <>
              <div>
                <label htmlFor="artistName" className="block text-sm/6 font-medium">
                  Artist name
                </label>
                <div className="mt-2">
                  <input
                    id="artistName"
                    {...register("artistName", {
                      required: "Artist name is required",
                    })}
                    placeholder="Your full name"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base line-1 outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
                {errors.artistName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.artistName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="stageName" className="block text-sm/6 font-medium">
                  Stage name
                </label>
                <div className="mt-2">
                  <input
                    id="stageName"
                    {...register("stageName")}
                    placeholder="Optional artist alias"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base line-1 outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm/6 font-medium">
                  Genre
                </label>
                <div className="mt-2">
                  <input
                    id="genre"
                    {...register("genre")}
                    placeholder="Pop, Indie, Classical..."
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base line-1 outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message:
                      "Please enter a valid email address (e.g., name@example.com)",
                  },
                })}
                placeholder="Your email here"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base line-1 outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Please use at least 8 characters",
                  },
                })}
                placeholder="****"
                autoComplete={
                  authMode === "login" ? "current-password" : "new-password"
                }
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {authMode === "register" && (
            <>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm/6 font-medium">
                  Artist bio
                </label>
                <div className="mt-2">
                  <textarea
                    id="bio"
                    rows="3"
                    {...register("bio")}
                    placeholder="Tell listeners a little about your sound"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            {authMode === "login" && (
              <div className="m-3 text-red-400">
                <button
                  type="button"
                  className="hover:pointer"
                  onClick={() => setShowHint((prev) => !prev)}
                >
                  Hint :
                </button>
                {showHint && <span> abhi@gmail.com , abhi@1234</span>}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {authMode === "login" ? "Sign in" : "Create artist account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      if (result.status === 200) {
        //   console.log("success", result);
        navigate("/Dashboard");
      }
    } catch (err) {
      // console.log("error", err.response.data.message);
      seterror(err.response.data.message);
    }
  }

  return (
    <div className="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="lg:w-[32rem] w-[18rem] relative">
        <img src="./Logo.jpg" alt="Logo belongs here" className=" "></img>
        <h1 className="absolute top-[38%] right-6 place-self-end flex bg-gradient-to-r from-stone-400 to-zinc-100  [-webkit-text-stroke:0.3px_gray]  bg-clip-text text-transparent lg:text-7xl text-4xl font-black">
          CREATR
        </h1>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full text-stone-600 sm:max-w-sm">
        {error && (
          <div className="text-white bg-red-400 flex justify-center  border">
            <h1>{error}</h1>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label for="email" className="block text-sm/6 font-medium ">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                //type="email"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address (e.g., name@example.com)",
                  },
                })}
                name="email"
                placeholder="Your Email here"
              //  autocomplete="email"
                className="block w-full rounded-md bg-white/5  px-3 py-1.5 text-base line-1 outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm/6 font-medium ">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: { value: 8, message: "Hint : Text has length 8" },
                })}
                name="password"
                placeholder="****"
                autocomplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?
          <a
            href="#"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register Here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Register;

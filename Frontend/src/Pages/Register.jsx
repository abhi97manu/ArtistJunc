import React from 'react'
import axios from 'axios'
import { useForm,  } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

            const {
                register,
                handleSubmit,
                watch,
                formState: { errors }
            } = useForm();
  

    async function onSubmit(data) {
        try{
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`,{
                      email:data.email,
                      password:data.password
                  },{
                  withCredentials: true,
                  })
          
                if(result.status === 200){
                console.log("success",result);
       
        navigate('/Dashboard')
      }
        }
        catch(err){
          console.log("error",err);
        }
     
      
    }

  


  return (

<div className="flex h-screen flex-col  justify-center items-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
   
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full text-stone-600 sm:max-w-sm">
    <form onSubmit={handleSubmit(onSubmit)} 
    
    
    className="space-y-6">
      <div>
        <label for="email" className="block text-sm/6 font-medium ">Email address</label>
        <div className="mt-2">
          <input id="email" type="email" {...register("email",{required:"This is required"})} name="email"  placeholder='..@gmail' autocomplete="email" className="block w-full rounded-md bg-white/5  px-3 py-1.5 text-base line-1 outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm/6 font-medium ">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" type="password" {...register("password",{required:true,minLength:{value:8,message: 'min length is 8'} })} name="password" placeholder='****'  autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-2 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        <p>{errors.password?.message}</p>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-400">
      Not a member?
      <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Register Here</a>
    </p>
  </div>
</div>

  )
}

export default Register
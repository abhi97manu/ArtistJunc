import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ManageTours = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="w-full h-fit p-8 ">
        <div className="relative w-full min-h-full bg-blue-200 p-3">
          <button
            className="outline outline-dashed rounded p-2"
            onClick={() => setShowForm((prev) => !prev)}
          >
            + add a tour
          </button>
        </div>
        {showForm && <TourForm setShowForm={setShowForm} />}
      </div>
    </>
  );
};

const TourForm = ({ setShowForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    
    console.log(data);

    setShowForm((prev) => !prev);
  }
  

  return (
    <div className="bg-stone-800/50 absolute w-full h-full top-0 left-0 flex justify-center items-center">
      <div className="lg:w-[32rem] w-[24rem]  bg-white rounded-lg text-center  p-4 ">
        <h1 className="text-2xl font-bold">Add your Tour</h1>
        <form onSubmit={handleSubmit(onSubmit)} >
            <input type="text" placeholder="Tour Name" {...register("tourName",{required:true})} className="border p-2 rounded mt-4 w-[100%]"/>
            <br/> 
            <div className="flex w-full gap-4 justify-center items-center">
                
                <input type="date" className="border p-2 rounded mt-4 w-[10%] " {...register("tourDate",{required:true})}/>
                
                <input type="text" placeholder="Tour Venue" className="border p-2 rounded mt-4 w-[70%] " {...register("tourVenue",{required:true})}/>
               
            </div>
            
            <input type="file" placeholder="Tour Poster" accept="image/*" className="border p-2 rounded mt-4 w-[100%]" {...register("tourPoster",{required:true})}/>
            <br/>
            <button type="submit" className="bg-blue-900 text-white p-2 rounded mt-4">Submit</button>

        </form>
        </div>
    </div>
  );
};

export default ManageTours;

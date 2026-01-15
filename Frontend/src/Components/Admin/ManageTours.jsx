import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ServerUrl = import.meta.env.VITE_SERVER_URL;

const ManageTours = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTours, setShowTours] = useState([]);

  useEffect(() => {
    console.log("changed ", showForm);
    axios
      .get(`${ServerUrl}/admin/tour/getTours`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setShowTours(res.data);
      })
      .catch((err) => console.log("error while geeting tours", err));
  }, [showForm]);

  return (
    <>
      <div className="w-full h-fit p-8 ">
        <div className="relative w-full min-h-full bg-blue-200 p-3">
          <div className="flex justify-between px-2 my-2 font-bold">
            <h1>Tour</h1>
            <h1>Tour Name</h1>
            <h1>Tour Venue</h1>
            <h1>Tour Date</h1>
            <h1>Availability</h1>
          </div>
          <hr></hr>
          {showTours &&
            showTours.map((element, key) => (
              <div key={key}>
                <TourDetails tourData={element} />
                <hr></hr>
              </div>
            ))}
          <button
            className="outline outline-dashed rounded p-2 w-full mt-2  hover:cursor-pointer"
            onClick={() => setShowForm((prev) => !prev)}
          >
            + add a tour
          </button>
        </div>
        {showForm && <TourForm setShowForm={setShowForm} showForm={showForm} />}
      </div>
    </>
  );
};

const TourForm = ({ setShowForm, showForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
      console.log(data[key]);
    }
    formData.append("tourPoster", data["tourPoster"][0]);

    axios
      .post(`${ServerUrl}/admin/tour/createTour`, formData, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("error while uploading Tour", err));

    setShowForm((prev) => !prev);
  };

  return (
    <div
      className="bg-stone-800/50 absolute w-full h-full top-0 left-0 flex justify-center items-center"
      onClick={() => setShowForm((prev) => !prev)}
    >
      <div
        className="lg:w-[32rem] w-[24rem]  bg-white rounded-lg text-center  p-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">Add your Tour</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Tour Name"
            {...register("tourName", { required: true })}
            className="border p-2 rounded mt-4 w-[100%]"
          />
          <br />
          <div className="flex w-full gap-4 justify-center items-center">
            <input
              type="date"
              className="border p-2 rounded mt-4 w-[10%] "
              {...register("tourDate")}
            />

            <input
              type="text"
              placeholder="Tour Venue"
              className="border p-2 rounded mt-4 w-[70%] "
              {...register("tourVenue", { required: true })}
            />
          </div>

          <input
            type="file"
            placeholder="Tour Poster"
            accept="image/*"
            className="border p-2 rounded mt-4 w-[100%]"
            {...register("tourPoster", { required: true })}
          />
          <br />
          <button
            type="submit"
            className="bg-blue-900 text-white p-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const TourDetails = ({ tourData }) => {
  return (
    <div className="flex flex-row justify-between px-2 my-2 text-center ">
      <h1>Tours</h1>
      <h1>{tourData.tourName}</h1>
      <h2>{tourData.tourVenue}</h2>
      <h2>
        {new Date(tourData.tourDate).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </h2>
      <h1>{tourData.availability ? "avialable" : "booked"}</h1>
    </div>
  );
};

export default ManageTours;

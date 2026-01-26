import React from "react";

const Cards_OverV = ({icon, label, value, upcoming = null }) => {
  return (
    <div className=" p-4 flex flex-col bg-white shadow-lg justify-center rounded-lg h-[8rem] ">
      <div className="h-[2rem]">
         <img src = {icon} className="h-full"></img>
         <h1>{upcoming}
         </h1>
      </div>
   
    <div className=" ">
        <h1 className=" mt-2 lg:text-2xl  lg:font-semibold text-xl font-base">
          {value}
        </h1>
      
      </div>
      <h1 className="  truncate text-sm font-light italic text-gray-600">
        {label}
      </h1>
     
    </div>
  );
};

export default Cards_OverV;

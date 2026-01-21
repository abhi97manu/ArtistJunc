import React from "react";

const Cards_OverV = ({ label, value }) => {
  return (
    <div className=" flex flex-col bg-white shadow-lg justify-center rounded-lg h-[8rem]">
      <h1 className="lg:text-2xl px-1 truncate lg:font-bold text-xl font-semibold">
        {label}
      </h1>
      <div className="justify-between flex px-2">
        <h1 className="px-2 mt-2 lg:text-2xl px-2 lg:font-semibold text-xl font-base">
          {value}
        </h1>
        <h1 className="px-2 mt-2 lg:text-2xl px-2 lg:font-semibold text-xl font-base">
          {value}
        </h1>
      </div>
    </div>
  );
};

export default Cards_OverV;

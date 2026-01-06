import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const server_url = import.meta.env.VITE_SERVER_URL;
const TourGuide = () => {
  const [tourDet, setTourDet] = useState();

  useEffect(() => {
    async function getTourDetails() {
      try {
        const resp = await axios.get(`${server_url}/admin/tour/getTour`);

        setTourDet(resp.data);
        console.log();
      } catch (err) {
        console.log("error while getting Tour", err);
      }
    }

    getTourDetails();
  }, []);
  return (
    <div className="absolute top-0 bg-zinc-800/70 p-2 w-full h-full justify-center flex text-center place-self-center text-white  ">
      <table className="w-[60rem] ">
        <tr className="text-center border-b-2">
          <th className="p-2" colSpan={4}>
            Tour
          </th>
        </tr>

        {console.log(tourDet)}

        {tourDet &&
          tourDet.map((value, key) => {
            return (
              <tr key={key} className="text-center w-full  border-b-2 ">
                <td> {value.tourName}</td>
                <td>
                 
                  {new Date(value.tourDate).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                   // hour: "2-digit",
                  //  minute: "2-digit",
                  })}
                </td>
                <td> {value.tourVenue}</td>
                <td> {value.availability ? "Buy" : "Sold"}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default TourGuide;

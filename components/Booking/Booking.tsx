"use client";
import React, { useEffect, useState } from "react";
import AutoComplateAddress from "./AutoComplateAddress";
import Cars from "./Cars";
import Cards from "./Cards";

function Booking() {
  const [screenHight, setScreenHight] = useState(0);
  useEffect(() => {
    setScreenHight(window.innerHeight * 0.72);
  }, [window]);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHight }}
      >
        <AutoComplateAddress />
        <Cars />
        <Cards />
        <button
          className="w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;

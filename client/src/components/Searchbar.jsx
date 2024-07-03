import React from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-transparent w-full">
      <div className="flex items-center px-4 border-r border-gray-300 w-[30%]">
        <FaMapMarkerAlt className="text-gray-500" />
        <input
          type="text"
          placeholder="Bangalore"
          className="ml-2 outline-none py-2 w-full bg-transparent"
        />
      </div>
      <div className="flex items-center px-4 w-[70%]">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          className="ml-2 outline-none py-2 w-full bg-transparent"
        />
      </div>
    </div>
  );
};

export default Searchbar;

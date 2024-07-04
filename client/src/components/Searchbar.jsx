import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useQuery, gql } from "@apollo/client";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TfiSearch } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const hardcodedSuggestions = [
  "Internal Medicine",
  "Ophthalmology",
  "Ear, Nose, and Throat (ENT)",
  "Obstetrics and Gynecology",
  "Cardiology",
  "Dermatology",
  "Neurology",
];
const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const doctorsData = gql`
    query DoctorByName($name: String!) {
      doctorByName(name: $name) {
        name
        id
      }
    }
  `;
  const specialization_query = gql`
    query Specialities($name: String!) {
      specialities(name: $name) {
        name
      }
    }
  `;

  const handleFocus = () => {
    if (searchQuery.trim() === "" && !showSuggestions) {
      setShowSuggestions(true);
    }
  };
  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement.classList.contains("suggestion-item")) {
        setShowSuggestions(false);
      }
    }, 200); // Delayed to check click outside
  };
  const handleSuggestionClick = (suggestion) => {
    // setSearchQuery(suggestion);
    setSearchQuery("")
    setShowSuggestions(false);
    const sugg = suggestion.split(" ").join("-");
    navigate(`/search/speaciality/${sugg}`);
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleOnSubmit =(e)=>{
    // e.preventDefault();
    const query = searchQuery.split(" ").join("-");
    navigate(`/search/:${query}`)
  }
  const {
    loading: doctor_loading,
    error: doctor_error,
    data: doctorData,
  } = useQuery(doctorsData, {
    variables: { name: searchQuery },
  });
  const {
    loading: specialization_loading,
    error: specialization_error,
    data: specialization_data,
  } = useQuery(specialization_query, {
    variables: { name: searchQuery },
  });

  const handleDoctorClick = (doctor) => {
    // setSearchQuery(doctor);
    setShowSuggestions(false);
    const doc_name = doctor.split(" ").join("-");
    navigate(`/search/doctor/${doc_name}`);
  };

  console.log("data", doctorData);

  return (
    <>
      {/* <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-transparent w-full"> */}
        <form onSubmit={handleOnSubmit} className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-transparent w-full">
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
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search doctors, clinics, hospitals, etc."
              className="ml-2 outline-none py-2 w-full bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </form>
      {/* </div> */}
      <div className="absolute z-30 left-[42%] top-[14.5%] w-[28%]">
        {showSuggestions && searchQuery.trim() === "" && (
          <div className=" bg-white rounded-b shadow-lg mt-1 z-10 border-[1px] border-gray-400 w-[100%]">
            <p className="text-xs text-gray-500 mb-2 bg-gray-100 p-2">
              Popular Searches
            </p>

            <div className="flex gap-3 items-center justify-center">
              <button
                className="flex gap-3 items-center justify-center bg-gray-100 p-1 rounded-lg w-[30%] text-gray-800"
                onClick={() => handleSuggestionClick("Dermatology")}
              >
                <BsFillLightningChargeFill />
                <span>Dermatology</span>
              </button>
              <button
                className="flex gap-3 items-center justify-center bg-gray-100 p-1 rounded-lg w-[30%] text-gray-800"
                onClick={() => handleSuggestionClick("Psychiatry")}
              >
                <BsFillLightningChargeFill />
                <span>Psychiatry</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 bg-gray-100 p-2">
              Common Specialities
            </p>
            <ul>
              {hardcodedSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 suggestion-item list-none flex gap-3 items-center justify-start"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-100">
                    <TfiSearch
                      width={20}
                      height={20}
                      className="text-gray-400"
                    />
                  </div>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
        {specialization_data && specialization_data.specialities.length > 0 && (
          <div className=" bg-white rounded-b shadow-lg mt-1 z-10 border-[1px] border-gray-400 w-[100%]">
            <p className="text-xs text-gray-500  bg-gray-100 p-2">
              Specialities
            </p>

            {specialization_data.specialities.map((speciality, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 suggestion-item list-none flex gap-3 items-center justify-start"
                onClick={() => handleSuggestionClick(speciality.name)}
              >
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-100">
                  <TfiSearch width={20} height={20} className="text-gray-400" />
                </div>
                {speciality.name}
              </li>
            ))}
          </div>
        )}
        {doctorData && doctorData.doctorByName.length > 0 && (
          <div className=" bg-white rounded-b shadow-lg z-10 border-[1px] border-gray-400 w-[100%] border-t-0">
            <p className="text-xs text-gray-500  bg-gray-100 p-2">Doctors</p>

            {doctorData.doctorByName.map((doctor, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 suggestion-item list-none flex gap-3 items-center justify-start"
                onClick={() => handleDoctorClick(doctor.id)}
              >
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-100">
                  <TfiSearch width={20} height={20} className="text-gray-400" />
                </div>
                {doctor.name}
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;

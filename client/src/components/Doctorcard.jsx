import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDoctor } from "../redux/slices/doctorSlice";

const Doctorcard = ({ doctor }) => {
  // console.log("DOCt",doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoProfile = () => {
    localStorage.setItem('doctor',JSON.stringify(doctor));
    dispatch(setDoctor(doctor));
    navigate(`/search/doctor/${doctor.id}`);

  };
  return (
    <div className="flex items-center justify-between border-b-[1px] border-gray-200 rounded-lg p-2">
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-[100%]">
          <img
            src={doctor.profile_img}
            alt=""
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div>
          <p
            onClick={handleGoProfile}
            className="text-[#199fd9] text-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {doctor.name}
          </p>
          <p className="text-gray-600">{doctor.experience} years experience</p>
          <p className="text-gray-600">₹ {doctor.fee} Consultation Fees</p>
          <p className="text-gray-800">Address: {doctor?.City}</p>
        </div>
      </div>
      <div>
        <button
          className="text-white bg-[#199fd9] p-2 w-[200px] h-[50px] rounded-md"
          onClick={handleGoProfile}
        >
          <p>Book Clinic Visit</p>
          <p className="text-xs text-white opacity-75">No Booking Fee</p>
        </button>
      </div>
    </div>
  );
};

export default Doctorcard;

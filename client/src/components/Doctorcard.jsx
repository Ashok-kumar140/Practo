import React from "react";
import { useNavigate } from "react-router-dom";

const Doctorcard = ({ doctor }) => {
  // console.log("DOCt",doctor);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border-[1px] border-gray-200 rounded-lg p-2">
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-[100%]">
          <img src={doctor.profile_img} alt=""  width={150} height={150} className="rounded-full"/>
        </div>
        <div>
          <p onClick={()=>navigate(`/search/doctor/${doctor.id}`)} className="text-[#199fd9] text-xl underline hover:scale-105 transition-all duration-300 cursor-pointer">{doctor.name}</p>
          <p>{doctor.experience} years experience</p>
          <p>₹ {doctor.fee} Consultation Fees</p>
        </div>
      </div>
      <div>
        <button className="text-white bg-[#199fd9] p-2 w-[220px] h-[48px] rounded-md"
        onClick={()=>navigate(`/search/doctor/${doctor.id}`)}
        >
            <p>Book Clinic Visit</p>
            <p className="text-xs text-white opacity-75">No Booking Fee</p>
        </button>
      </div>
    </div>
  );
};

export default Doctorcard;

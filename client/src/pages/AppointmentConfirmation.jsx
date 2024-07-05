import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { USER_APPOINTMENTS } from "../utils/Queries";
import confirm_image from "../assets/accept-icon.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const AppointmentConfirmation = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    // console.log("USER",user)
    if(!user){
    // console.log("USER",user)

      navigate('/login');
      return
    }
  },[]);

  const {
    loading,
    error,
    data: appointmentdata,
  } = useQuery(USER_APPOINTMENTS, {
    variables: { patId: user?.id },
  });

  // const array = [...appointmentdata?.appointmentsByPatId]
  
  // console.log("DDDD",array?.reverse())

  // console.log("data", appointmentdata);

  return (
    <div className="flex flex-col w-[60%] mx-auto mt-20 items-center justify-center">
      <div className="flex items-center justify-center gap-3 text-3xl">
        <img src={confirm_image} alt="" width={60} height={60} />
        Your Appointment Confirmed
      </div>
      <div className="w-[100%]">
        {appointmentdata &&
          appointmentdata.appointmentsByPatId?.map((app) => (
            <div className="w-[100%] bg-green-200 mx-auto p-5 rounded-lg mt-10" key={app.id}>
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-[100%]">
                  <img
                    src={app.doc_profile}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-[#199fd9] rounded-md text-xl">
                    {app.doc_name}
                  </p>
                  <p>{app.doc_experience} years experience</p>
                  <p>₹ {app.doc_fee} Consultation Fees</p>
                </div>
              </div>
              {/* <div>
          <p>Specialities of doctor are-</p>
          {doctor_specialities.map((spec) => (
            <p>{spec.name}</p>
          ))}
        </div> */}
              <div className="mt-10 font-bold">Clinic Address:</div>
              <div>
                <div className="flex gap-2 items-center text-gray-700 ">
                  <MdOutlineLocationOn fill="#CD7F32" />
                  {app.clinic_name}
                </div>
                <p className="ml-10 text-sm">
                  {app.clinic_address}, {app.clinic_city}
                </p>
              </div>

              <div className="mt-10 font-semibold text-lg">
                Timing of appointment is : {`${app.start_time}:00`}
              </div>

              <div className="mt-5 font-semibold text-sm">
                Fee to pay for this appointment is ₹{app.doc_fee}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppointmentConfirmation;

import React, { useEffect, useState } from "react";
import { BiSolidCommentAdd } from "react-icons/bi";
import {
  USER_APPOINTMENTS2,
} from "../utils/Queries";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { MdOutlineLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

const SlotPage = () => {
  const navigate = useNavigate();
  const [bookedSlots, setBookedSlots] = useState([]);

  const { doctor_clinics } = useSelector((state) => state.doctor);
  const { doctor } = useSelector((state) => state.doctor);

  console.log("DOC", doctor);


  const [alreadyBookedSlot, { data, loading, error }] =
    useMutation(USER_APPOINTMENTS2);

  const hanldeBookedSlot = async () => {
    try {
      const data = await alreadyBookedSlot({
        variables: {
          docId: doctor?.id,
          clinicId: doctor_clinics?.id,
        },
      });
      // console.log("RESPONSE",data);
      const BookedSlots = data.data.appointmentByDocIdAndClinicId.map(
        (app) => app.start_time
      );
      setBookedSlots(BookedSlots);

    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(()=>{
    hanldeBookedSlot();
  },[]);
  if (loading) return <p>Loading...</p>;

  const slot = [];
  let start = doctor_clinics.start_time;
  const end = doctor_clinics.end_time;
  while (start < end) {
    slot.push(start);
    start = start + 1;
  }
  console.log(slot);

  return (
    <>
      <div className="w-[100%] mx-auto flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mt-16 mb-5">Pick a time slot</h1>
        <div className="bg-gray-50 rounded-lg w-40% md:w-[50%] lg:w-[40%]">
          <div className="bg-[#d7f5fe] p-3 rounded-t-lg">
            <div className="flex items-center justify-between p-2">
              <div className="flex gap-3 items-center justify-center">
                <BiSolidCommentAdd fill="#318CE7" />
                <p className="text-xl">Clinic Appointment</p>
              </div>
              <p className="text-xl font-bold">₹ {doctor?.fee} fee</p>
            </div>
          </div>
          <div>
            <ul className="ml-5 grid grid-cols-1 gap-3 text-gray-500 my-5">
              <li key={doctor_clinics.id}>
                <div className="flex gap-3 items-center text-gray-700 ">
                  <MdOutlineLocationOn fill="#CD7F32" />
                  {doctor_clinics.name}
                </div>
                <p className="ml-10 text-sm">
                  {doctor_clinics.address}, {doctor_clinics.city}
                </p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-4 gap-3 m-3 ">
            {slot.map((s, index) => {
              if (bookedSlots.includes(s)) {
                return (
                  <div
                    key={index}
                    className={`border-[1px] border-red-600 w-[70px] p-3 text-red-400 rounded-md line-through `}
                  >
                    {`${s}:00`}
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/slot/${s}/payment-summary`)}
                    className={`border-[1px] border-[#199fd9] w-[70px] p-3 text-[#199fd9] rounded-md cursor-pointer hover:bg-slate-100 transition-all duration-300 `}
                  >
                    {`${s}:00`}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotPage;

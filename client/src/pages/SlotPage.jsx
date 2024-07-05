import React, { useState } from "react";
import { BiSolidCommentAdd } from "react-icons/bi";
import {
  ALREADY_BOOKED_SLOTS,
  CLINICS_BY_DOC_ID,
  DOCTOR_BY_ID,
} from "../utils/Queries";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MdOutlineLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

const SlotPage = () => {
  const navigate = useNavigate();

  const { doctor_clinics } = useSelector((state) => state.doctor);
  const { doctor } = useSelector((state) => state.doctor);
  console.log("DOC", doctor_clinics);

  const { loading, error, data } = useQuery(ALREADY_BOOKED_SLOTS, {
    variables: { docId: doctor.id, clinicId: doctor_clinics.id },
  });
  const BookedSlots = [];

  data &&
    data.appointmentByDocIdAndClinicId.map((app) => {
      BookedSlots.push(app.start_time);
    });
  console.log("DATAA", BookedSlots);

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
        <h1 className="text-xl font-bold mt-16">Pick a time slot</h1>
        <div className="bg-gray-50 rounded-lg w-40% md:w-[50%] lg:w-[40%]">
          <div className="bg-[#d7f5fe] p-3 rounded-t-lg">
            <div className="flex items-center justify-between p-2">
              <div className="flex gap-3 items-center justify-center">
                <BiSolidCommentAdd fill="#318CE7" />
                <p>Clinic Appointment</p>
              </div>
              <p>₹ {doctor.fee} fee</p>
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
            {BookedSlots &&
              slot.map((s, index) => {
                if (BookedSlots.includes(s)) {
                  return (
                    <div
                      key={index}
                      className={`border-[1px] border-red-600 w-[70px] p-3 text-red-400 rounded-md `}
                    >
                      {`${s}:00`}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`/slot/${s}/payment-summary`)}
                      className={`border-[1px] border-[#199fd9] w-[70px] p-3 text-[#199fd9] rounded-md cursor-pointer `}
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

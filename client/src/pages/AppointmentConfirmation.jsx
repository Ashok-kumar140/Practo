import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CANCEL_APPOINTMENT, USER_APPOINT } from "../utils/Queries";
import confirm_image from "../assets/accept-icon.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AppointmentConfirmation = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("USER",user)
    if (!user) {
      // console.log("USER",user)

      navigate("/login");
      return;
    }
  }, []);

  const [cancelAppointment] = useMutation(CANCEL_APPOINTMENT);

  const [user_appoints] = useMutation(USER_APPOINT);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await user_appoints({
        variables: { patId: user?.id },
      });
      setAppointments(data?.appointmentsByPatId);
      // appointments.reverse();
    } catch (error) {
      console.log("Error while fetching user appointments", error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const response = await cancelAppointment({
        variables: { appointmentId: id },
      });
      toast.success("Appointment cancel successfully");
      fetchAppointments();
    } catch (error) {
      console.log("Error while canceling appointment", error);
    }
  };

  // appointments && appointments.reverse();

  return (
    <div className="flex flex-col w-[60%] mx-auto mt-20 items-center justify-center">
      <div className="w-[100%]">
        {appointments && appointments?.length === 0 ? (
          <div className="flex items-center justify-center text-2xl font-semibold">
            You Haven't book any appointment yet.
          </div>
        ) : (
          <div className="w-[100%]">
            <div className="flex items-center justify-center gap-3 text-3xl">
              <img src={confirm_image} alt="" width={60} height={60} />
              Your Confirmed Appointments Are
            </div>
            <div className="border border-gray-600 mt-10"></div>
            <div className="w-[100%]">
              {appointments &&
                appointments?.map((app) => (
                  <div
                    className="w-[100%] mx-auto p-5 rounded-lg mt-10 border-b border-b-gray-150 "
                    key={app.id}
                  >
                    <div className="flex items-center gap-10 justify-between">
                      <div className="flex items-center gap-10">
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
                      <div
                        className="bg-red-400 p-2 rounded-md cursor-pointer"
                        onClick={() => handleCancelAppointment(app.id)}
                      >
                        Cancel Appointment
                      </div>
                    </div>
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
        )}
      </div>
    </div>
  );
};

export default AppointmentConfirmation;

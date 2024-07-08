import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ADD_APPOINTMENT,
  CREATE_PAYMENT,
  VERIFY_PAYMENT,
} from "../utils/Queries";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import practo_logo from "../assets/logo.png";
import { MdOutlineLocationOn } from "react-icons/md";
const PaymentSummaryPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { slot_time } = useParams();
  const navigate = useNavigate();
  const { doctor, doctor_clinics, doctor_specialities } = useSelector(
    (state) => state.doctor
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);
  const [
    createPayment,
    // eslint-disable-next-line
    { data: create_pay_data, loading, error: create_pay_error },
  ] = useMutation(CREATE_PAYMENT);

  const [
    verifypayment,
    // eslint-disable-next-line
    { data: verifyData, loading: verifyLoading, error: verifyError },
  ] = useMutation(VERIFY_PAYMENT);
  const [
    addAppointment,
    {
      data: appointmentData,
      // eslint-disable-next-line
      loading: appointmentLoading, error: appointmentError,
    },
  ] = useMutation(ADD_APPOINTMENT);

  const handlePayment = async () => {
    try {
      const { data } = await createPayment({
        variables: { amount: doctor.fee },
      });
      console.log("RESPONSE", data.createOrder);
      if (!data.createOrder.success) {
        throw new Error("Error while capturing payment");
      }

      const options = {
        key: process.env.RAZORPAY_KEY,
        currency: data.createOrder.currency,
        amount: `${data.createOrder.amount}`,
        order_id: data.createOrder.id,
        name: "Practo",
        description: "Thank you for booking the appointment on Practo",
        image: practo_logo,
        prefill: {
          name: `${user.name} `,
          email: user.email,
        },
        handler: function (response) {
          verifyPayment({ ...response });
        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.");
        console.log(response.error);
      });
    } catch (error) {
      console.log("ERROR WHILE MAKING PAYMENT", error);
    }
  };

  const verifyPayment = async (response) => {
    try {


      const { data } = await verifypayment({
        variables: {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        },
      });

      console.log("DATA FROM VERIFY PAYMENT: ", data);
      if (!data?.verifyPayment.success) {
        throw new Error(data);
      }

      toast.success("Payment successful");
      // now we have to insert this entry into appointment table
      const appointmentdata = await addAppointment({
        variables: {
          docId: doctor.id,
          clinicId: doctor_clinics.id,
          patId: user.id,
          startTime: parseInt(slot_time),
        },
      });

      console.log("Appointment", appointmentdata);
      if (appointmentData?.data?.addAppointment?.success) {
        toast.success("Your appointment booked successfully");
      }
      navigate("/appointment-confirmation");
    } catch (error) {
      console.log("Error while calling verify payment API: ", error);
      toast.error("Could not verify payment");
    }
  };

  console.log("SPECIALITIES:", doctor_specialities);
  return (
    <div className="w-[50%] mx-auto mt-20 mb-10 items-center justify-center border m">
      <h1 className="flex items-center justify-center text-2xl font-semibold text-gray-800 mt-5">
        Payment Summary
      </h1>
      <div className="w-[100%] mx-auto p-5 rounded-lg mt-10">
        <div className="flex items-center gap-10">
          <div className="rounded-[100%]">
            <img
              src={doctor?.profile_img}
              alt=""
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="text-[#199fd9] rounded-md text-xl">{doctor?.name}</p>
            <p>{doctor?.experience} years experience</p>
            <p>₹ {doctor?.fee} Consultation Fees</p>
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
            {doctor_clinics?.name}
          </div>
          <p className="ml-10 text-sm">
            {doctor_clinics?.address}, {doctor_clinics?.city}
          </p>
        </div>

        <div className="mt-10 font-semibold text-lg">
          Timing of appointment is : {`${slot_time}:00`}
        </div>

        <div className="mt-5 font-semibold text-sm">
          Fee to pay for this appointment is ₹{doctor?.fee}
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            className="p-2 bg-[#199fd9] rounded-md text-white"
            onClick={handlePayment}
          >
            Pay ₹ {doctor?.fee}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryPage;

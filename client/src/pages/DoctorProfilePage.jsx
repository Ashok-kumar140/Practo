import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { LiaHandPointRightSolid } from "react-icons/lia";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  CLINICS_BY_DOC_ID,
  DOCTOR_BY_ID,
  GET_ALL_REVIEWS,
  SPECIALIZATION_BY_DOC_ID,
} from "../utils/Queries";
import { useDispatch, useSelector } from "react-redux";
import {
  setDoctor,
  setDoctorClinics,
  setDoctorSpecialities,
} from "../redux/slices/doctorSlice";
import ReviewModal from "../components/ReviewModal";
import { averageRating } from "../utils/AverageRating";

const DoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("ID",id);
  const { doctor } = useSelector((state) => state.doctor);
  const [reviewModal, setReviewModal] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const {
    loading,
    error,
    data: doctor_data,
  } = useQuery(DOCTOR_BY_ID, {
    variables: { doctorByIdId: id },
  });

  const {
    loading: spec_loading,
    error: spec_error,
    data: specialization_data,
  } = useQuery(SPECIALIZATION_BY_DOC_ID, {
    variables: { specialityByDocIdId: id },
  });

  const {
    loading: clinic_loading,
    error: clinic_error,
    data: clinic_data,
  } = useQuery(CLINICS_BY_DOC_ID, {
    variables: { clinicsByDocIdId: id },
  });
  const [getAllReviews] = useMutation(GET_ALL_REVIEWS);

  const handleBookAppointment = (clinic) => {
    dispatch(setDoctor(doctor ? doctor : doctor_data.doctorById));
    localStorage.setItem("doctor", JSON.stringify(doctor_data.doctorById));

    dispatch(setDoctorClinics(clinic));
    localStorage.setItem("clinics", JSON.stringify(clinic));

    dispatch(setDoctorSpecialities(specialization_data.specialityByDocId));
    localStorage.setItem(
      "specialities",
      JSON.stringify(specialization_data.specialityByDocId)
    );
    navigate(`/doctor/slot/${id}`);
  };

  const handleReview = async (req, res) => {
    if (user) {
      setReviewModal(true);
    } else {
      toast.error("You have to be logged in to give rating");
      navigate("/login");
    }
  };

  const fetchAllReviews = async () => {
    try {
      const response = await getAllReviews({
        variables: { docId: doctor.id },
      });
      // console.log("ALL revies", response);

      setAllReviews(response?.data?.allReviews);
    } catch (error) {
      console.log("Error while fetching all reviews", error);
    }
  };
  useEffect(() => {
    fetchAllReviews();
  }, []);
  return (
    <>
      {doctor_data && doctor_data.doctorById && (
        <div className="w-[50%] mt-10 mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-10 mb-4 ">
            <img
              src={doctor_data.doctorById.profile_img}
              alt="Dr. Sneha Gurukar"
              className="w-32 h-32"
            />
            <div>
              <h2 className="text-xl font-bold">
                {doctor_data.doctorById.name}
              </h2>

              <p className="text-sm text-gray-600">
                {doctor_data.doctorById.experience} Years Experience Overall
              </p>
              <p className="text-sm text-gray-600">
                ₹ {doctor_data.doctorById.fee} Appointment Fee
              </p>

              <div className="flex items-center space-x-2 my-4">
                <span className="text-white bg-green-600 rounded-full w-[20px] h-[20px] flex items-center justify-center">
                  ✓
                </span>
                <p className="text-sm font-semibold text-gray-800">
                  Medical Registration Verified
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-xl font-bold text-gray-700 mb-4">
              Specialization In
            </p>
            <ul className="ml-5 grid sm:grid-cols-2  text-gray-500">
              {specialization_data &&
                specialization_data.specialityByDocId?.map((spec) => (
                  <li className="flex gap-2 items-center " key={spec.id}>
                    <LiaHandPointRightSolid
                      className="text-gray-400"
                      fill="#CD7F32"
                    />
                    {spec.name}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-700 mt-4">
              {doctor_data.doctorById.name} Practices At
            </p>
            <ul className="ml-5 grid grid-cols-1  text-gray-500">
              {clinic_data &&
                clinic_data.clinicsByDocId?.map((clinic) => (
                  <li
                    className="flex gap-6 justify-between pr-10 my-7 border p-3"
                    key={clinic.id}
                  >
                    <div>
                      <div className="flex gap-2 items-center text-gray-700 ">
                        <MdOutlineLocationOn fill="#CD7F32" />
                        {clinic.name}
                      </div>
                      <p className="ml-10 text-sm">
                        {clinic.address}, {clinic.city}
                      </p>
                    </div>
                    <button
                      className="text-white bg-[#199fd9] p-2 w-[220px] h-[48px] rounded-md"
                      onClick={() => handleBookAppointment(clinic)}
                    >
                      <div className=" flex items-center justify-center gap-2">
                        <BsFillLightningChargeFill fill="#FFFFFF" />
                        <p>Book Appointment</p>
                      </div>

                      <p className="text-xs text-center">
                        Instant Pay Available
                      </p>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="border-b border-gray-500 mb-5"></div>
          <div className="text-center text-xl font-semibold text-[#1e293b]">
            Reviews
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full sm:px-3 my-3">
              <div className="flex justify-between mb-12">
                <div className="">
                  <p>
                    <span className="text-lg font-semibold">
                      {averageRating(allReviews)}
                    </span>
                    \5.0
                  </p>
                  <p>({allReviews?.length} Reviews)</p>
                </div>
                <div>
                  <button
                    className="bg-[#199fd9] text-white p-2 rounded-md cursor-pointer"
                    onClick={handleReview}
                  >
                    Add Review
                  </button>
                </div>
              </div>

              {allReviews?.length > 0 ? (
                <div className="mb-7">
                  {allReviews?.map((review) => (
                    <div className="mb-7" key={review.id}>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-[50px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                            {review.user[0]}
                          </div>
                          <p>{review?.user}</p>
                        </div>
                        <div>{review.createdAt}</div>
                      </div>
                      <div>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={20}
                          edit={false}
                          activeColor="#ffd700"
                          emptyIcon={<FaStar />}
                          fullIcon={<FaStar />}
                        />
                        <p>{review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-7 text-lg font-semibold flex items-center justify-center">
                  <p>
                    No Review given yet. You will be first to give review this
                    audio book
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <ReviewModal
          setReviewModal={setReviewModal}
          fetchAllReviews={fetchAllReviews}
          doc_id={doctor.id}
        />
      )}
    </>
  );
};

export default DoctorPage;

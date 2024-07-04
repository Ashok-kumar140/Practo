import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Doctorcard from "../components/Doctorcard";
import Searchbar from "../components/Searchbar";
const ListingPage = () => {
  const { spec_name } = useParams();
  const updated_name = spec_name.split("-").join(" ");

  const specialities_data = gql`
    query DoctorBySpecialities($speciality: String!) {
      doctorBySpecialities(speciality: $speciality) {
        id
        name
        fee
        experience
        profile_img
        specialization
      }
    }
  `;

  const {
    loading,
    error,
    data: speciality_data,
  } = useQuery(specialities_data, {
    variables: { speciality: updated_name },
  });
  console.log(updated_name);

  console.log("DOC", speciality_data);

  return (
    <>
    <div className="flex justify-center items-start w-full md:w-[40%] mx-auto mt-8">
        <Searchbar />
      </div>
      <div className="md:w-[60%] mx-auto mt-20">
        <h1 className="text-3xl font-bold">
          {speciality_data && speciality_data.doctorBySpecialities.length}{" "}
          doctors available for "{updated_name}"
        </h1>
        <p className="text-lg text-gray-400 mb-3">
          Verified doctor details Book appointments with minimum wait-time &
          verified doctor details
        </p>
        <div className="flex flex-col gap-4">
          {speciality_data &&
            speciality_data.doctorBySpecialities.map((doctor) => (
              <Doctorcard key={doctor.id} doctor={doctor} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ListingPage;

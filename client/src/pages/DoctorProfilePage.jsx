import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const DoctorPage = () => {
  const { id } = useParams();
  const doctor_query = gql`
    query DoctorById($doctorByIdId: ID!) {
      doctorById(id: $doctorByIdId) {
        id
        name
        fee
        experience
        profile_img
      }
    }
  `;
// const doctor_query = gql`
//     query DoctorByName($name: String!) {
//   doctorByName(name: $name) {
//     id
//     name
//     fee
//     experience
//     profile_img
//   }
// }
//   `;

  const {
    loading,
    error,
    data: doctor_data,
  } = useQuery(doctor_query, {
    variables: { doctorByIdId: id },
  });
  console.log(id);
  

  console.log("DOCtor", doctor_data);
  return (
    <>
      {doctor_data && doctor_data.doctorById&& (
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
                BDS, MDS - Paedodontics And Preventive Dentistry
              </p>
              <p className="text-sm text-gray-600">
                Pediatric Dentist, Dentist, Dental Surgeon
              </p>
              <p className="text-sm text-gray-600">
              {doctor_data.doctorById.experience} Years Experience Overall
              </p>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-md mb-4">
            <p className="text-blue-600 font-bold">practo DENTAL</p>
            <p className="text-sm text-blue-600">
              Trusted Care. Lasting Smiles.
            </p>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-white bg-green-600 rounded-full w-[20px] h-[20px] flex items-center justify-center">
              ✓
            </span>
            <p className="text-sm font-semibold text-gray-800">
              Medical Registration Verified
            </p>
          </div>
          <p className="text-gray-800 mb-4">
            Dr. Sneha Gurukar is a Pediatric Dentist, Dentist, and Dental
            Surgeon in Kundalahalli, Bangalore and has an experience of 20 years
            in these fields. Dr. Sneha Gurukar practices at Gajanana Smile Care
            Dental Clinic in Kundalahalli, Bangalore, Axiss Dental Clinic -
            Domlur in Domlur, Bangalore and Axiss Dental Clinic - Jeevan Bhema
            Nagar in Jeevanbhimanagar, Bangalore. She completed BDS from
            Bangalore University in 1998 and MDS - Paedodontics And Preventive
            Dentistry from Rajiv Gandhi University of Health Sciences in 2016.
          </p>
          <p className="text-gray-800 mb-4">
            She is a member of Karnataka State Dental Council. Some of the
            services provided by the doctor are: Laser Lip Surgery, Inlays and
            Onlays, Temporomandibular Joint Dysfunction - ATM, Scraping
            Periodontal and Zirconia Crowns etc.
          </p>
          <a href="#" className="text-blue-600">
            Share your story
          </a>
        </div>
      )}
    </>
  );
};

export default DoctorPage;

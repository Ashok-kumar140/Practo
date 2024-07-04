import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
const SearchResult = () => {
  const { query } = useParams();
  const updated_name = spec_name.split("-").join(" ");
  const doctorsData = gql`
    query DoctorByName($name: String!) {
      doctorByName(name: $name) {
        name
      }
    }
  `;
  const specialization_query = gql`
    query Specialities($name: String!) {
      specialities(name: $name) {
        name
      }
    }
  `;
  const {
    loading: doctor_loading,
    error: doctor_error,
    data: doctorData,
  } = useQuery(doctorsData, {
    variables: { name: searchQuery },
  });
  const {
    loading: specialization_loading,
    error: specialization_error,
    data: specialization_data,
  } = useQuery(specialization_query, {
    variables: { name: searchQuery },
  });
  console.log("SPE",specialization_data);
  console.log("Doc",doctorData);
  return <div>

  </div>;
};

export default SearchResult;

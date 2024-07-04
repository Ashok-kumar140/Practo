import { gql } from "@apollo/client";

export const DOCTOR_BY_ID = gql`
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

export const SPECIALIZATION_BY_DOC_ID = gql`
  query SpecialityByDocId($specialityByDocIdId: ID!) {
    specialityByDocId(id: $specialityByDocIdId) {
      id
      name
    }
  }
`;

export const CLINICS_BY_DOC_ID = gql`
  query ClinicsByDocId($clinicsByDocIdId: ID!) {
    clinicsByDocId(id: $clinicsByDocIdId) {
      id
      name
      address
      city
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      name
      email
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      token
    }
  }
`;

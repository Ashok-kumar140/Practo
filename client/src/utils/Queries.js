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
      start_time
      end_time
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

export const CREATE_PAYMENT = gql`
  mutation CreateOrder($amount: Int) {
    createOrder(amount: $amount) {
      id
      currency
      amount
      receipt
      status
      success
    }
  }
`;

export const VERIFY_PAYMENT = gql`
  mutation VerifyPayment(
    $razorpayOrderId: String!
    $razorpayPaymentId: String!
    $razorpaySignature: String!
  ) {
    verifyPayment(
      razorpay_order_id: $razorpayOrderId
      razorpay_payment_id: $razorpayPaymentId
      razorpay_signature: $razorpaySignature
    ) {
      success
      message
    }
  }
`;

export const ALREADY_BOOKED_SLOTS = gql`
  query AppointmentByDocIdAndClinicId($docId: ID!, $clinicId: ID!) {
    appointmentByDocIdAndClinicId(doc_id: $docId, clinic_id: $clinicId) {
      start_time
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $docId: ID!
    $patId: ID!
    $clinicId: ID!
    $startTime: Int!
  ) {
    addAppointment(
      doc_id: $docId
      pat_id: $patId
      clinic_id: $clinicId
      start_time: $startTime
    ) {
      id
      success
    }
  }
`;

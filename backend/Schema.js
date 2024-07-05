export const typeDefs = `#graphql
  type Doctor{
    id: ID!
    name: String!
    fee:Int!
    experience:Int!
    profile_img:String!
    specialization:String
  }
  type User{
    id:ID!
    name:String!
    email:String!
    password:String!
    confirmPassword:String
    token:String!
  }
  type Speciality{
    id: ID!
    name: String!
    
  }
  type Clinic{
    id: ID!
    name:String!
    address:String!
    city:String!
    start_time:Int!
    end_time:Int!

  }
  type Order {
    id: String
    currency: String
    amount: Int
    receipt: String
    status: String
    success:Boolean
  }
  type Appointment{
    id:ID!
    doc_id:ID!
    pat_id:ID!
    clinic_id:ID!
    start_time:Int!
    success:Boolean
    doctor:Doctor
  }
  type PaymentVerificationResponse{
    success: Boolean
    message: String

  }
  
  type Query {
    doctors: [Doctor]
    doctorByName(name:String!):[Doctor]
    doctorById(id:ID!):Doctor
    doctorBySpecialities(speciality:String! limit:Int offset:Int):[Doctor]
    clinicsByDocId(id: ID!): [Clinic]
    specialities(name:String!):[Speciality]
    specialityByDocId(id:ID!):[Speciality]
    appointmentByDocIdAndClinicId(doc_id:ID!,clinic_id:ID!):[Appointment]
    appointmentsByPatId(pat_id:ID!):[Appointment]

  }
  type Mutation{
    addUser(name: String!, email: String!,password:String!,confirmPassword:String!): User
    loginUser(email:String!,password:String!):User
    createOrder(amount: Int): Order
    verifyPayment(razorpay_order_id: String!, razorpay_payment_id: String!, razorpay_signature: String!): PaymentVerificationResponse
    addAppointment(doc_id:ID!,pat_id:ID!,clinic_id:ID!,start_time:Int!): Appointment
  },
  # Doctor:{
  #   clinics: {}
  # }

  
`;

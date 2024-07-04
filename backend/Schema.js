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

  }
  type Query {
    doctors: [Doctor]
    doctorByName(name:String!):[Doctor]
    doctorById(id:ID!):Doctor
    doctorBySpecialities(speciality:String! limit:Int offset:Int):[Doctor]
    clinicsByDocId(id: ID!): [Clinic]
    specialities(name:String!):[Speciality]
    specialityByDocId(id:ID!):[Speciality]
    

  }
  type Mutation{
    addUser(name: String!, email: String!,password:String!,confirmPassword:String!): User
    loginUser(email:String!,password:String!):User
  }

  
`;

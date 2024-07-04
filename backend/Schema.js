export const typeDefs = `#graphql
  type Doctor{
    id: ID!
    name: String!
    fee:Int!
    experience:Int!
    profile_img:String!
    specialization:String
  }
  type Speciality{
    id: ID!
    name: String!

  }
  type Query {
    doctors: [Doctor]
    doctorByName(name:String!):[Doctor]
    doctorById(id:ID!):Doctor
    doctorBySpecialities(speciality:String! limit:Int offset:Int):[Doctor]
    # doctor(name: String!): Doctor
    specialities(name:String!):[Speciality]

  }

  
`;

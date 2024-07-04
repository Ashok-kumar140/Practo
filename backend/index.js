import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs} from './Schema.js'; // Assuming your schema is in schema.js
import resolvers from './resolvers.js'; // Update with your actual resolvers file
import mysql from 'mysql2/promise'; // Using promise-based MySQL client
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
dotenv.config();
const startServer = async () => {
  try {
    // Create MySQL connection pool

    app.use(cors());
    const pool = mysql.createPool({
      host: process.env.HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
    });


  

  
    await pool.getConnection();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { pool } 
    });

    await server.start();

    server.applyMiddleware({ app });

    // Start the server
    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
  }
};

startServer();
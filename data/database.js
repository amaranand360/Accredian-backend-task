import mysql from 'mysql2';
import { config } from "dotenv";


config({
  path: "./data/config.env",
});

const connectionLimit = process.env.DB_CONNECTION_LIMIT;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
// Create a connection pool
export const pool = mysql.createPool({
    connectionLimit,
    host,
    user,
    password,
    database,
  });
  
  export const connectDB = () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }
  
        console.log(`Database connected with ${connection.config.host}`);
        // You can perform additional setup here if needed.
  
        // Release the connection back to the pool
        connection.release();
        resolve();
      });
    });
  };



// Don't forget to close the pool when your application is shutting down
process.on('exit', () => {
  connectDB.end((err) => {
    if (err) {
      console.error('Error closing MySQL pool: ', err);
    } else {
      console.log('MySQL pool closed');
    }
  });
});

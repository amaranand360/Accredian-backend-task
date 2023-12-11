import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import { app } from "./app.js";


config({
  path: "./data/config.env",
});


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

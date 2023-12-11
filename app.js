import express from "express";
import userRouter from "./routes/user.js";

import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();




// Using Middlewares
app.use(express.json());
app.use(cookieParser());

// Using Error Middleware
app.use(errorMiddleware);



// Using routes
app.use("/api/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello, this is your API!');
});

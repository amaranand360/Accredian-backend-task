import { pool } from "../data/database.js"
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {

    try {
      const { name, email, password } = req.body;
      pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          return next(err);
        }
  
        if (results.length > 0) {
          return next(new ErrorHandler("User Already Exists", 400));
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (insertErr) => {
          if (insertErr) {
            return next(insertErr);
          }
  
          sendCookie({ name, email, password: hashedPassword }, res, 'Registered Successfully', 201);
        });
      });
    } catch (error) {
      next(error);
    }
  };





export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          return next(err);
        }
  
        const user = results[0];
  
        if (!user) {
          return next(new ErrorHandler("Invalid credentials", 400));
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return next(new ErrorHandler("Invalid credentials", 400));
        }
  
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
      });
    } catch (error) {
      next(error);
    }
  };


export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'development' ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};


PORT = 8000
NODE_ENV = "Development"

JWT_SECRET = "randomenumber"
FRONTEND_URL = "https//localhost:3000"

DB_CONNECTION_LIMIT=10
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="Amar@123"
DB_DATABASE="LoginSystem"

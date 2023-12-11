import express from 'express';
import {
    logout,
    login,
    register,
} from '../controllers/user.js'


const userRouter = express.Router();



userRouter.post('/signup',register);
userRouter.post('/login',login);

userRouter.get("/logout", logout);


export default userRouter;
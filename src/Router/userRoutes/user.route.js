import { asyncErrorHandler } from "../../Errors/asyncErrorHandler.js";
import {
  userRegister,
  userLogin,
  userForget,
  userResetPassword,
} from "../../controllers/userControllers.js";


import express from "express";

const userRouter = express.Router();

userRouter.post("/register", asyncErrorHandler(userRegister));
userRouter.post("/login", asyncErrorHandler(userLogin));
userRouter.post("/forgotPassword", asyncErrorHandler(userForget));
userRouter.put("/resetPassword/:token", asyncErrorHandler(userResetPassword));

export default userRouter;

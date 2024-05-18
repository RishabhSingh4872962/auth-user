import { asyncErrorHandler } from "../../Errors/asyncErrorHandler.js";
import {
  userRegister,
  userLogin,
  userForget,
  userResetPassword,
logout as userLogout ,
} from "../../controllers/userControllers.js";


import express from "express";
import { isUserAuthenticated } from "../../middleware/isUserAuthenticated.js";

const userRouter = express.Router();

userRouter.post("/register", asyncErrorHandler(userRegister));
userRouter.post("/login", asyncErrorHandler(userLogin));
userRouter.post("/forgotPassword", asyncErrorHandler(userForget));
userRouter.put("/resetPassword/:token", asyncErrorHandler(userResetPassword));
userRouter.delete("/logout",isUserAuthenticated,asyncErrorHandler(userLogout))

export default userRouter;

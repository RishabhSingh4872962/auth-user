import {
  userRegister,
  userLogin,
  userForget,
  userResetPassword,
} from "../../controllers/userControllers.js";

import express from "express";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.get("/login", userLogin);
userRouter.post("/forgotPassword", userForget);
userRouter.put("/resetPassword", userResetPassword);

export default userRouter;

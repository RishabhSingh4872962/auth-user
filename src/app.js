import express from "express";
import userRouter from "./Router/userRoutes/user.route.js";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.use(globalErrorHandler);

export default app;

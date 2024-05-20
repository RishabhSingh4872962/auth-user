import express from "express";
import userRouter from "./Router/userRoutes/user.route.js";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import morgan from "morgan";
import helmet from "helmet";
import postRouter from "./Router/postRoutes/post.route.js";
import { isUserAuthenticated } from "./middleware/isUserAuthenticated.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("short"));
app.use(helmet());

// User auth Routes
app.use("/api/v1/user", userRouter);


// User Post Routes  
app.use("/api/v1/post",postRouter)

app.use(globalErrorHandler);

export default app;

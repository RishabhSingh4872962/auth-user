import { configDotenv } from "dotenv";

configDotenv()
const _config = {
  PORT: process.env.PORT,
  EMAIL: process.env.email,
  PASSWORD: process.env.password,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};


export default _config

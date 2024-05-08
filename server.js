
import _config from "./src/config/config.js"

const PORT = _config.PORT || 5000;



import app from "./src/app.js";
import mongoose from "mongoose";
async function runServer() {
  // MongoDB connection
await  mongoose
    .connect("mongodb://localhost:27017/mydatabase")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });



  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

runServer();

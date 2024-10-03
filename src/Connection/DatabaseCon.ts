import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

// console.log("enter...")
const dbConnectionUrl = `${process.env.DB_PORT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAINNAME}/${process.env.DB_NAME}`;
mongoose.connect(dbConnectionUrl)
  .then(() => console.log("Database successfully connected..."))
  .catch((error) => console.error("Database connection error:", error));


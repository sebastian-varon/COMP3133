require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = requrie("./routes/userRoutes")

const app = express();
const PORT = process.env.port || 8081;

//Middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/users", userRoutes);

//start server
connectDB();
app.listen(PORT, () => console.log("Server running on port ${PORT}"));
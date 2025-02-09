require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);

// Start Server
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
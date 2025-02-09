require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const User = require("./models/User");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const seedDatabase = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

    await User.deleteMany({});
    console.log("Existing user data deleted");

    await User.insertMany(data);
    console.log("Database seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();
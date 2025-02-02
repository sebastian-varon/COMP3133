require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const seedDatabase = async () => {
  try {
    // Read JSON data from file
    const data = fs.readFileSync("restaurants.json", "utf-8");
    const restaurants = JSON.parse(data);

    // Clear existing data
    await Restaurant.deleteMany({});
    console.log("Existing restaurant data deleted");

    // Insert new data
    await Restaurant.insertMany(restaurants);
    console.log("New restaurant data seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();
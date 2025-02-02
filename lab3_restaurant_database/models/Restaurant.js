const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  city: String,
  restaurant_id: String,
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);

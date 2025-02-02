const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// GET all restaurants
router.get("/", async (req, res) => {
  try {
    let sortBy = req.query.sortBy;
    let sortOrder = sortBy === "ASC" ? 1 : sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find().sort({ restaurant_id: sortOrder });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET restaurants by cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: req.params.cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET restaurants sorted by restaurant_id
router.get("/", async (req, res) => {
  try {
    let sortOrder = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find().select("id cuisines name city restaurant_id").sort({ restaurant_id: sortOrder });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET restaurants with cuisines=Delicatessen and city!=Brooklyn
router.get("/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: "Delicatessen", city: { $ne: "Brooklyn" } })
      .select("cuisines name city -_id")
      .sort({ name: 1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

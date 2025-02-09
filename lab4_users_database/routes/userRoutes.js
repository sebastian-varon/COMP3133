const express = require("express");
const User = require("../models/User");
const router = express.router();

router.post("/", async (req, res) => {
    try {
        const newUSer = new User(req.body);
        await newUSer.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
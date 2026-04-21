const express = require("express");
const router = express.Router();

const {
  saveLocation,
  getAllLocations
} = require("../controllers/locationController");

// 📍 Save user location
router.post("/save-location", saveLocation);

// 📍 Get all users location
router.get("/all-locations", getAllLocations);

module.exports = router;
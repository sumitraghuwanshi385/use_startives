const express = require("express");
const router = express.Router();

const {
  saveLocation,
  getAllLocations
} = require("../controllers/locationController");

// 📍 Save location
router.post("/save-location", saveLocation);

// 📍 Get all locations
router.get("/all-locations", getAllLocations);

module.exports = router;
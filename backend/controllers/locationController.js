const axios = require("axios");
const User = require("../models/User");

// 📍 SAVE USER LOCATION
const saveLocation = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "UserId required" });
    }

    // 🌍 Get IP-based location
    const ipData = await axios.get("http://ip-api.com/json/");

    const { lat, lon, city, country } = ipData.data;

    // 💾 Save to DB
    await User.findByIdAndUpdate(userId, {
      location: {
        lat,
        lng: lon,
        city,
        country
      }
    });

    return res.json({
      success: true,
      lat,
      lng: lon,
      city,
      country
    });

  } catch (err) {
    console.error("Save Location Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📍 GET ALL USERS LOCATION
const getAllLocations = async (req, res) => {
  try {
    const users = await User.find({
      "location.lat": { $exists: true, $ne: null }
    });

    const formatted = users.map((u) => ({
      id: u._id,
      name: u.name,
      lat: u.location.lat,
      lng: u.location.lng,
      profilePictureUrl: u.profilePictureUrl || null
    }));

    res.json(formatted);

  } catch (err) {
    console.error("Get Locations Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  saveLocation,
  getAllLocations
};
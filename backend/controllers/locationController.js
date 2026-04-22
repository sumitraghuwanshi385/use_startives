const axios = require("axios");
const User = require("../models/User");

// 🔀 RANDOM FALLBACK LOCATION (GLOBAL)
const randomLat = () => (Math.random() * 180 - 90);
const randomLng = () => (Math.random() * 360 - 180);

// 📍 SAVE USER LOCATION
const saveLocation = async (req, res) => {
  try {
    const { userId, ip } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId required"
      });
    }

    let lat, lon, city, country, regionName;

    // 🔥 NEW: IF IP COMES FROM FRONTEND (BEST CASE)
    if (ip) {
      const ipData = await axios.get(`http://ip-api.com/json/${ip}`);
      lat = ipData.data.lat;
      lon = ipData.data.lon;
      city = ipData.data.city;
      country = ipData.data.country;
      regionName = ipData.data.regionName;
    } else {
      // 🔥 OLD METHOD (fallback - server IP)
      const ipData = await axios.get("http://ip-api.com/json/");
      lat = ipData.data.lat;
      lon = ipData.data.lon;
      city = ipData.data.city;
      country = ipData.data.country;
      regionName = ipData.data.regionName;
    }

    await User.findByIdAndUpdate(userId, {
      location: {
        lat,
        lng: lon,
        city,
        state: regionName,
        country
      }
    });

    return res.json({
      success: true,
      lat,
      lng: lon,
      city,
      state: regionName,
      country
    });

  } catch (err) {
    console.error("Save Location Error:", err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// 📍 GET ALL USERS (WITH FALLBACK)
const getAllLocations = async (req, res) => {
  try {
    const users = await User.find();

    const formatted = users.map((u) => ({
      id: u._id,
      name: u.name,
      lat: u.location?.lat ?? randomLat(),
      lng: u.location?.lng ?? randomLng(),
      profilePictureUrl: u.profilePictureUrl || null,
      city: u.location?.city || "",
      state: u.location?.state || "",
      country: u.location?.country || ""
    }));

    res.json(formatted);

  } catch (err) {
    console.error("Get Locations Error:", err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  saveLocation,
  getAllLocations
};
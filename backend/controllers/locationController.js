const axios = require("axios");
const User = require("../models/User");

// 🔀 RANDOM FALLBACK (only if no data)
const randomLat = () => (Math.random() * 180 - 90);
const randomLng = () => (Math.random() * 360 - 180);

// 🌍 GET BEST LOCATION FROM MULTIPLE APIs
const getLocationFromIP = async (ip) => {
  try {
    // 🔥 1st TRY (BEST ACCURACY)
    const res1 = await axios.get(`https://ipwho.is/${ip}`);
    if (res1.data && res1.data.success) {
      return {
        lat: res1.data.latitude,
        lng: res1.data.longitude,
        city: res1.data.city,
        state: res1.data.region,
        country: res1.data.country
      };
    }
  } catch (err) {}

  try {
    // 🔥 2nd TRY (FALLBACK)
    const res2 = await axios.get(`http://ip-api.com/json/${ip}`);
    if (res2.data && res2.data.status === "success") {
      return {
        lat: res2.data.lat,
        lng: res2.data.lon,
        city: res2.data.city,
        state: res2.data.regionName,
        country: res2.data.country
      };
    }
  } catch (err) {}

  // ❌ FAIL → fallback random (rare case)
  return {
    lat: randomLat(),
    lng: randomLng(),
    city: "",
    state: "",
    country: ""
  };
};

// 📍 SAVE LOCATION
const saveLocation = async (req, res) => {
  try {
    const { userId, ip } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId required"
      });
    }

    let locationData;

    // 🔥 USE USER IP (BEST)
    if (ip) {
      locationData = await getLocationFromIP(ip);
    } else {
      // ⚠️ fallback (server IP — less accurate)
      locationData = await getLocationFromIP("");
    }

    await User.findByIdAndUpdate(userId, {
      location: locationData
    });

    return res.json({
      success: true,
      ...locationData
    });

  } catch (err) {
    console.error("Save Location Error:", err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// 📍 GET ALL USERS (NO DUPLICATE + CLEAN DATA)
const getAllLocations = async (req, res) => {
  try {
    const users = await User.find();

    // 🔥 REMOVE DUPLICATES BY ID
    const uniqueMap = new Map();

    users.forEach((u) => {
      uniqueMap.set(String(u._id), u);
    });

    const uniqueUsers = Array.from(uniqueMap.values());

    const formatted = uniqueUsers.map((u) => ({
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
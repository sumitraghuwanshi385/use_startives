import axios from "axios";
import User from "../models/User.js";

// 📍 Save location
export const saveLocation = async (req, res) => {
  try {
    const { userId } = req.body;

    const ipData = await axios.get("http://ip-api.com/json/");

    const { lat, lon, city, country } = ipData.data;

    await User.findByIdAndUpdate(userId, {
      location: {
        lat,
        lng: lon,
        city,
        country
      }
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📍 Get all users
export const getAllLocations = async (req, res) => {
  try {
    const users = await User.find({ "location.lat": { $exists: true } });

    res.json(users.map(u => ({
      id: u._id,
      name: u.name,
      lat: u.location.lat,
      lng: u.location.lng
    })));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
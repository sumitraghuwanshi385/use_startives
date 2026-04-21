import express from "express";
import { saveLocation, getAllLocations } from "../controllers/locationController.js";

const router = express.Router();

router.post("/save-location", saveLocation);
router.get("/all-locations", getAllLocations);

export default router;
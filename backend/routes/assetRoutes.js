const express = require("express");

const router = express.Router();

const {
createAsset,
getAssets,
getAsset
} = require("../controllers/assetController");

router.post("/",createAsset);

router.get("/",getAssets);

router.get("/:id",getAsset);

module.exports = router;
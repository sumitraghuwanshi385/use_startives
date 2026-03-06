const express = require("express");
const router = express.Router();

const {
createAsset,
getAssets,
getAsset,
deleteAsset
} = require("../controllers/assetController");


// CREATE
router.post("/",createAsset);

// GET ALL
router.get("/",getAssets);

// GET SINGLE
router.get("/:id",getAsset);

// DELETE
router.delete("/:id",deleteAsset);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
createAsset,
getAssets,
getAsset,
updateAsset,
deleteAsset
} = require("../controllers/assetController");


// CREATE
router.post("/",createAsset);

// GET ALL
router.get("/",getAssets);

// GET SINGLE
router.get("/:id",getAsset);

// UPDATE
router.put("/:id",updateAsset);

// DELETE
router.delete("/:id",deleteAsset);

module.exports = router;
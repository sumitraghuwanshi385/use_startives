const express = require("express");
const router = express.Router();

let assets = []; // temporary storage

// CREATE ASSET
router.post("/assets", (req,res)=>{

const asset = {
id: Date.now().toString(),
...req.body,
postedDate: new Date()
};

assets.push(asset);

res.json({
success:true,
asset
});

});

// GET ALL ASSETS
router.get("/assets",(req,res)=>{

res.json({
assets
});

});

module.exports = router;
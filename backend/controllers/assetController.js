const Asset = require("../models/Asset");

// CREATE ASSET
exports.createAsset = async(req,res)=>{

try{

const asset = new Asset(req.body);

await asset.save();

res.status(201).json({
success:true,
asset
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
message:"Asset creation failed"
});

}

};

// GET ALL ASSETS
exports.getAssets = async(req,res)=>{

try{

const assets = await Asset.find().sort({createdAt:-1});

res.json({
success:true,
assets
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
message:"Fetch failed"
});

}

};

// GET SINGLE ASSET
exports.getAsset = async(req,res)=>{

try{

const asset = await Asset.findById(req.params.id);

if(!asset){

return res.status(404).json({
success:false,
message:"Asset not found"
});

}

res.json({
success:true,
asset
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
message:"Fetch failed"
});

}

};

// DELETE ASSET
exports.deleteAsset = async(req,res)=>{

try{

await Asset.findByIdAndDelete(req.params.id);

res.json({
success:true,
message:"Asset deleted"
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
message:"Delete failed"
});

}

};
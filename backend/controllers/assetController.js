const Asset = require("../models/Asset");

exports.createAsset = async(req,res)=>{

try{

const asset = new Asset(req.body);

await asset.save();

res.json(asset);

}catch(err){

res.status(500).json({error:"Asset create failed"});

}

};

exports.getAssets = async(req,res)=>{

try{

const assets = await Asset.find().sort({createdAt:-1});

res.json(assets);

}catch(err){

res.status(500).json({error:"Fetch failed"});

}

};

exports.getAsset = async(req,res)=>{

try{

const asset = await Asset.findById(req.params.id);

res.json(asset);

}catch(err){

res.status(500).json({error:"Fetch failed"});

}

};
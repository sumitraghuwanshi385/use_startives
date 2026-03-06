const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

description:String,

category:String,

website:String,

price:String,

logo:String,

ownerId:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Asset",assetSchema);
const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

tagline:{
type:String
},

description:{
type:String,
required:true
},

category:{
type:String
},

businessModel:{
type:String
},

location:{
type:String
},

websiteUrl:{
type:String
},

brandLogo:{
type:String
},

cardCover:{
type:String
},

gallery:[
String
],

askingPrice:{
type:String
},

ttmRevenue:{
type:String
},

mrr:{
type:String
},

multiplier:{
type:String
},

netProfit:{
type:String
},

churnRate:{
type:String
},

growthPulse:{
type:String
},

teamSize:{
type:String
},

techStack:{
type:String
},

competitorInfo:{
type:String
},

reasonForSale:{
type:String
},

handoverNotes:{
type:String
},

paymentMethods:{
type:String
},

contactEmail:{
type:String
},

additionalContactDetails:{
type:String
},

founderId:{
type:String
},

founderEmail:{
type:String
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Asset",assetSchema);
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

revenueModel:{
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

techStack:{
type:String
},

siteAge:{
type:String
},

teamSize:{
type:String
},

teamDetails:{
type:String
},

users:{
type:String
},

growth:{
type:String
},

directTraffic:{
type:String
},

retention:{
type:String
},

trafficDetails:{
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

sellerInsightsDetails:{
type:String
},

askingPrice:{
type:String
},

multiplier:{
type:String
},

ttmRevenue:{
type:String
},

mrr:{
type:String
},

growthPulse:{
type:String
},

netProfit:{
type:String
},

churnRate:{
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

founderName:{
type:String
},

founderEmail:{
type:String
},

usersCount:{
type:Number
},

views:{
type:Number,
default:0
},

likes:{
type:Number,
default:0
},

status:{
type:String,
default:"active"
},

verified:{
type:Boolean,
default:false
},

createdAt:{
type:Date,
default:Date.now
},

updatedAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Asset",assetSchema);
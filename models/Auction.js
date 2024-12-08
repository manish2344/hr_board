// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const auctionSchema = new Schema({
//   productName: { 
//     type: String, 
//     required: true 
//   },
//   description: { 
//     type: String, 
//     required: true 
//   },
//   currentBid: { 
//     type: Number, 
//     default: 0 
//   },
//   highestBidder: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User' 
//   },
//   timer: { 
//     type: Number, 
//     default: 30 
//   },
//   sold: { 
//     type: Boolean, 
//     default: false 
//   }
// });

// module.exports = mongoose.model('Auction', auctionSchema);



const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  productName: String,
  description: String,
  startingBid: Number,
  currentBid: Number,
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  timer: { type: Number, default: 30 },
  isClosed: { type: Boolean, default: false },
  sold: { type: Boolean, default: false },
});

module.exports = mongoose.model('Auction', AuctionSchema);

const express = require('express');
const { createAuction, placeBid, getAuction, endAuction ,getAllAuctions } = require('../controllers/auctionController');
const authMiddleware = require('../middleware/authenticate');
const router = express.Router();

// Route to create a new auction (authenticated users only)
router.post('/create', authMiddleware, createAuction);
router.get('/all', authMiddleware, getAllAuctions);

// Route to place a bid on an auction (authenticated users only)
router.post('/bid', authMiddleware, placeBid);

// Route to get auction details by ID (public or authenticated)
router.get('/:id', getAuction);

// Route to get all auctions (authenticated users only)

// Optional: Route to manually end an auction (if needed)
router.post('/end/:id', authMiddleware, async (req, res) => {
  const auctionId = req.params.id;
  
  try {
    await endAuction(auctionId, req.app.get('io')); // Pass the socket.io instance if needed
    res.status(200).json({ message: 'Auction ended successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error ending the auction', error: error.message });
  }
});

module.exports = router;


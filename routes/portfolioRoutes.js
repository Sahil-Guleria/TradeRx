// routes/portfolioRoutes.js

const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Get the entire portfolio
router.get('/', portfolioController.getPortfolio);

// Add a trade to the portfolio
router.post('/addTrade', portfolioController.addTrade);

// Get cumulative returns
router.get('/cumulativeReturn', portfolioController.getCumulativeReturn);

// Get holdings in an aggregate view
router.get('/holdings', portfolioController.getHoldings);

// Delete a trade
router.post('/removeTrade/:tradeId', portfolioController.deleteTrade);

// Update a trade
router.post('/updateTrade/:tradeId', portfolioController.modifyTrade);

module.exports = router;

const Trade = require('../models/trade');

// Function to add a trade to the portfolio
exports.addTrade = async (req, res) => {
  try {
    const tradeData = req.body;
    const trade = new Trade(tradeData);
    await trade.save();
    res.json({ success: true, message: 'Trade added successfully', trade });
  } catch (error) {
    console.error('Error adding trade:', error);
    res.status(500).json({ success: false, message: 'Error adding trade' });
  }
};

// Function to retrieve the portfolio data
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Trade.find().sort({ date: 1 });
    res.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Error retrieving portfolio:', error);
    res.status(500).json({ success: false, message: 'Error retrieving portfolio' });
  }
};

// Function to delete a trade from the portfolio
exports.deleteTrade = async (req, res) => {
  try {
    const tradeId = req.params.tradeId;
    await Trade.findByIdAndDelete(tradeId);
    res.json({ success: true, message: 'Trade deleted successfully' });
  } catch (error) {
    console.error('Error deleting trade:', error);
    res.status(500).json({ success: false, message: 'Error deleting trade' });
  }
};

// Function to modify a trade in the portfolio
exports.modifyTrade = async (req, res) => {
  try {
    const tradeId = req.params.tradeId;
    const updatedTradeData = req.body;
    const updatedTrade = await Trade.findByIdAndUpdate(tradeId, updatedTradeData, { new: true });
    res.json({ success: true, message: 'Trade modified successfully', trade: updatedTrade });
  } catch (error) {
    console.error('Error modifying trade:', error);
    res.status(500).json({ success: false, message: 'Error modifying trade' });
  }
};

// Function to calculate and return the average buying price for a stock
exports.getAverageBuyingPrice = async (req, res) => {
  try {
    const stockName = req.params.stockName;
    const stockTrades = await Trade.find({ stockName, type: 'BUY' });
    const totalQuantity = stockTrades.reduce((sum, trade) => sum + trade.quantity, 0);
    const totalPrice = stockTrades.reduce((sum, trade) => sum + (trade.price * trade.quantity), 0);
    const averagePrice = totalQuantity !== 0 ? totalPrice / totalQuantity : 0;
    res.json({ success: true, data: { stockName, averagePrice } });
  } catch (error) {
    console.error('Error calculating average buying price:', error);
    res.status(500).json({ success: false, message: 'Error calculating average buying price' });
  }
};

// Function to calculate and return the cumulative return for the portfolio
exports.getCumulativeReturn = async (req, res) => {
  try {
    const initialInvestment = (await Trade.find({ type: 'BUY' })).reduce((sum, trade) => sum + (trade.quantity * trade.price), 0);
    const finalValue = (await Trade.find({ type: 'SELL' })).reduce((sum, trade) => sum + (trade.quantity * trade.price), 0);
    const cumulativeReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;
    res.json({ success: true, data: cumulativeReturn });
  } catch (error) {
    console.error('Error calculating cumulative return:', error);
    res.status(500).json({ success: false, message: 'Error calculating cumulative return' });
  }
};

// Function to get holdings in an aggregate view
exports.getHoldings = async (req, res) => {
  try {
    const holdings = {};
    const trades = await Trade.find();

    trades.forEach(trade => {
      if (!holdings[trade.stockName]) {
        holdings[trade.stockName] = {
          totalQuantity: 0,
          averagePrice: 0,
        };
      }

      if (trade.type === 'BUY') {
        holdings[trade.stockName].totalQuantity += trade.quantity;
        holdings[trade.stockName].averagePrice = (holdings[trade.stockName].averagePrice * (holdings[trade.stockName].totalQuantity - trade.quantity) + trade.quantity * trade.price) / holdings[trade.stockName].totalQuantity;
      } else if (trade.type === 'SELL') {
        holdings[trade.stockName].totalQuantity -= trade.quantity;
      }
    });

    res.json({ success: true, data: holdings });
  } catch (error) {
    console.error('Error getting holdings:', error);
    res.status(500).json({ success: false, message: 'Error getting holdings' });
  }
};

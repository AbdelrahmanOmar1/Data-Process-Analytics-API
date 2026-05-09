const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

router.get("/top-sales", analyticsController.getTopSales);
router.get("/dead-stock", analyticsController.getDeadStock);
router.get("/profit-report", analyticsController.getProfitReport);
router.get("/item/:itemCode", analyticsController.getItemAnalytics);

module.exports = router;

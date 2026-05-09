const router = require("express").Router();
const controller = require("../controllers/analyticsController");

router.get("/top-items", controller.topItems);
router.get("/deadstock", controller.deadStock);
router.get("/profit", controller.profitReport);
router.get("/search", controller.searchItem);

module.exports = router;

const router = require("express").Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/uploadController");

router.post("/sales", upload.single("file"), controller.uploadSales);
router.post("/purchase", upload.single("file"), controller.uploadPurchase);

module.exports = router;

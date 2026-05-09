const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const uploadController = require("../controllers/uploadController");
const dataController = require("../controllers/dataController");

// ======================
// DATA UPLOAD
// ======================
router.post("/sales", upload.single("file"), uploadController.uploadSales);
router.post(
  "/purchases",
  upload.single("file"),
  uploadController.uploadPurchases,
);

// ======================
// DATA FETCH
// ======================
router.get("/sales-data", dataController.getSalesData);
router.get("/purchases-data", dataController.getPurchasesData);

module.exports = router;

const { PrismaClient } = require("@prisma/client");
const { parseCSVFile } = require("../utils/ParseCsv");

const generateAnalytics = require("../utils/generateAnalytics");

const prisma = new PrismaClient();

const BATCH_SIZE = 5000;

// helpers to clean up keys with extra spaces from CSV headers
const cleanRow = (row) => {
  const cleaned = {};
  for (const key in row) {
    cleaned[key.trim()] = row[key];
  }
  return cleaned;
};

// ======================
//  SALES UPLOAD
// ======================
exports.uploadSales = async (req, res) => {
  try {
    const rows = await parseCSVFile(req.file.path);

    let batch = [];
    let processed = 0;

    for (const row of rows) {
      const r = cleanRow(row);

      batch.push({
        branchCode: r["فرع"] || "UNKNOWN",
        branchName: r["اسم الفرع"] || "",
        departmentCode: r["كود القسم"] || "",
        departmentName: r["القسم"] || "",
        mainGroupCode: r["مجموعة رئيسية"] || "",
        mainGroupName: r["اسم مجموعة رئيسية"] || "",
        subGroupCode: r["مجموعة فرعية"] || "",
        subGroupName: r["اسم المجموعة فرعية"] || "",
        itemCode: r["كود الصنف"] || "",
        barcode: String(r["باركود"] || ""),
        itemName: r["اسم الصنف"] || "",
        netSalesQuantity: parseFloat(r["صافى كمية مبيعات"]) || 0,
        netSalesValue: parseFloat(r["صافى قيمة مبيعات"]) || 0,
      });

      if (batch.length === BATCH_SIZE) {
        await prisma.sales.createMany({
          data: batch,
          skipDuplicates: true,
        });

        processed += batch.length;
        batch = [];
      }
    }

    // remaining rows
    if (batch.length > 0) {
      await prisma.sales.createMany({
        data: batch,
        skipDuplicates: true,
      });

      processed += batch.length;
    }

    res.json({
      message: "Sales uploaded successfully",
      rows: processed,
    });
    generateAnalytics().catch(console.error);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================
//  PURCHASES UPLOAD
// ======================
exports.uploadPurchases = async (req, res) => {
  try {
    const rows = await parseCSVFile(req.file.path);

    let batch = [];
    let processed = 0;

    for (const row of rows) {
      const r = cleanRow(row);

      batch.push({
        itemCode: r["كود الصنف"] || "",
        itemName: r["إسم الصنف"] || "",
        purchaseValue: parseFloat(r["قيمة المشتريات"]) || 0,
        returnValue: parseFloat(r["قيمة المرتجعات"]) || 0,
        purchaseReturnRate: parseFloat(r["نسبه المرتجعات للمشتريات"]) || 0,
        bonusQuantity: parseFloat(r["كمية البوانص"]) || 0,
        netPurchaseQuantity: parseFloat(r["صافى كمية المشتريات"]) || 0,
      });

      if (batch.length === BATCH_SIZE) {
        await prisma.purchases.createMany({
          data: batch,
          skipDuplicates: true,
        });

        processed += batch.length;
        batch = [];
      }
    }

    if (batch.length > 0) {
      await prisma.purchases.createMany({
        data: batch,
        skipDuplicates: true,
      });

      processed += batch.length;
    }

    res.json({
      message: "Purchases uploaded successfully",
      rows: processed,
    });
    generateAnalytics().catch(console.error);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

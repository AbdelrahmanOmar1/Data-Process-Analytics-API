const prisma = require("../utils/prisma");
const { parseCSV } = require("../utils/csvParser");

/* ========== SALES UPLOAD ========== */
exports.uploadSales = (req, res) => {
  parseCSV(req.file.path, async (rows) => {
    try {
      for (let row of rows) {
        const itemCode = row["كود الصنف"];
        const itemName = row["اسم الصنف"];

        /* UPSERT ITEM */
        await prisma.item.upsert({
          where: { itemCode },
          update: { itemName },
          create: { itemCode, itemName },
        });

        /* INSERT SALE */
        await prisma.sale.create({
          data: {
            itemCode,
            qty: Number(row["صافى كمية مبيعات"] || 0),
            value: Number(row["صافى قيمة مبيعات"] || 0),
          },
        });
      }

      res.json({ message: "Sales uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
};

exports.uploadPurchase = (req, res) => {
  parseCSV(req.file.path, async (rows) => {
    try {
      for (let row of rows) {
        const itemCode = row["كود الصنف"];
        const itemName = row["اسم الصنف"];

        await prisma.item.upsert({
          where: { itemCode },
          update: { itemName },
          create: { itemCode, itemName },
        });

        await prisma.purchase.create({
          data: {
            itemCode,
            qty: Number(row["الكمية"] || 0),
            value: Number(row["الإجمالى"] || 0),
          },
        });
      }

      res.json({ message: "Purchase uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
};

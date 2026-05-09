const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const toNumber = (v) =>
  Number(
    String(v ?? "0")
      .replace(/,/g, "")
      .trim(),
  ) || 0;

async function generateAnalytics() {
  console.log("🔥 Analytics started");

  const sales = await prisma.sales.findMany();
  const purchases = await prisma.purchases.findMany();

  const map = new Map();


  // SALES
  for (const s of sales) {
    if (!s.itemCode) continue;

    if (!map.has(s.itemCode)) {
      map.set(s.itemCode, {
        itemCode: s.itemCode,
        itemName: s.itemName || "",
        totalSalesValue: 0,
        totalPurchaseValue: 0,
        totalSalesQty: 0,
        totalPurchaseQty: 0,
      });
    }

    const item = map.get(s.itemCode);

    item.totalSalesValue += toNumber(s.netSalesValue);
    item.totalSalesQty += toNumber(s.netSalesQuantity);
  }


  // PURCHASES
  for (const p of purchases) {
    if (!p.itemCode) continue;

    if (!map.has(p.itemCode)) {
      map.set(p.itemCode, {
        itemCode: p.itemCode,
        itemName: p.itemName || "",
        totalSalesValue: 0,
        totalPurchaseValue: 0,
        totalSalesQty: 0,
        totalPurchaseQty: 0,
      });
    }

    const item = map.get(p.itemCode);

    item.totalPurchaseValue += toNumber(p.purchaseValue);
    item.totalPurchaseQty += toNumber(p.netPurchaseQuantity);
  }

  // SAVE ANALYTICS
  for (const item of map.values()) {
    const totalSalesValue = toNumber(item.totalSalesValue);
    const totalPurchaseValue = toNumber(item.totalPurchaseValue);

    const profit = totalSalesValue - totalPurchaseValue;

    const deadStock =
      toNumber(item.totalSalesQty) === 0 && toNumber(item.totalPurchaseQty) > 0;

    await prisma.analytics.upsert({
      where: { itemCode: item.itemCode },
      update: {
        itemName: item.itemName,
        totalSalesValue,
        totalPurchaseValue,
        totalSalesQty: item.totalSalesQty,
        totalPurchaseQty: item.totalPurchaseQty,
        profit,
        deadStockFlag: deadStock,
      },
      create: {
        itemCode: item.itemCode,
        itemName: item.itemName,
        totalSalesValue,
        totalPurchaseValue,
        totalSalesQty: item.totalSalesQty,
        totalPurchaseQty: item.totalPurchaseQty,
        profit,
        deadStockFlag: deadStock,
      },
    });
  }

}

module.exports = generateAnalytics;

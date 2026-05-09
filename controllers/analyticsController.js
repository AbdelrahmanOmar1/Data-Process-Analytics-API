const { PrismaClient } = require("@prisma/client");
const AppError = require("../utils/AppError");

const prisma = new PrismaClient();

// =========================
// TOP N ITEMS BY SALES
// =========================
exports.getTopSales = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const data = await prisma.analytics.findMany({
      orderBy: {
        totalSalesValue: "desc",
      },
      take: limit,
    });

    res.json(data);
  } catch (err) {
    throw new AppError(500, err.message);
  }
};

// =========================
// DEAD STOCK ITEMS
// =========================
exports.getDeadStock = async (req, res) => {
  try {
    const data = await prisma.analytics.findMany({
      where: {
        deadStockFlag: true,
      },
      orderBy: {
        totalPurchaseValue: "desc",
      },
    });

    res.json(data);
  } catch (err) {
    throw new AppError(500, err.message);
  }
};

// =========================
// PROFIT REPORT
// =========================
exports.getProfitReport = async (req, res) => {
  try {
    const data = await prisma.analytics.findMany({
      orderBy: {
        profit: "desc",
      },
    });

    res.json(data);
  } catch (err) {
    throw new AppError(500, err.message);
  }
};

// =========================
// SINGLE ITEM ANALYTICS
// =========================
exports.getItemAnalytics = async (req, res) => {
  try {
    const { itemCode } = req.params;

    const item = await prisma.analytics.findUnique({
      where: { itemCode },
    });

    if (!item) {
      throw new AppError(404, "Item not found");
    }

    res.json(item);
  } catch (err) {
    throw new AppError(500, err.message);
  }
};

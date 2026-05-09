const { PrismaClient } = require("@prisma/client");

const AppError = require("../utils/AppError");

const prisma = new PrismaClient();

exports.getSalesData = async (req, res) => {
  try {
    const data = await prisma.sales.findMany({
      take: 1000,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(data);
  } catch (err) {
    throw new AppError(500, err.message);
  }
};

exports.getPurchasesData = async (req, res) => {
  try {
    const data = await prisma.purchases.findMany({
      take: 1000,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(data);
  } catch (err) {
    throw new AppError(500, err.message);
  }
};

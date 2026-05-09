const prisma = require("../utils/prisma");

exports.topItems = async (req, res) => {
  const data = await prisma.sale.groupBy({
    by: ["itemCode"],
    _sum: {
      qty: true,
      value: true,
    },
    orderBy: {
      _sum: {
        value: "desc",
      },
    },
    take: Number(req.query.n || 10),
  });

  res.json(data);
};

exports.deadStock = async (req, res) => {
  const data = await prisma.item.findMany({
    include: {
      sales: true,
    },
  });

  const result = data
    .filter((item) => item.sales.length === 0)
    .map((item) => ({
      itemCode: item.itemCode,
      itemName: item.itemName,
    }));

  res.json(result);
};

exports.profitReport = async (req, res) => {
  const sales = await prisma.sale.groupBy({
    by: ["itemCode"],
    _sum: { value: true },
  });

  const purchases = await prisma.purchase.groupBy({
    by: ["itemCode"],
    _sum: { value: true },
  });

  const map = new Map();

  sales.forEach((s) => {
    map.set(s.itemCode, {
      sales: s._sum.value || 0,
      purchase: 0,
    });
  });

  purchases.forEach((p) => {
    if (!map.has(p.itemCode)) {
      map.set(p.itemCode, { sales: 0, purchase: p._sum.value || 0 });
    } else {
      map.get(p.itemCode).purchase = p._sum.value || 0;
    }
  });

  const result = Array.from(map.entries()).map(([itemCode, v]) => ({
    itemCode,
    sales: v.sales,
    purchase: v.purchase,
    profit: v.sales - v.purchase,
  }));

  res.json(result);
};

exports.searchItem = async (req, res) => {
  const { name } = req.query;

  const items = await prisma.item.findMany({
    where: {
      OR: [
        { itemCode: { contains: name } },
        { itemName: { contains: name, mode: "insensitive" } },
      ],
    },
    include: {
      sales: true,
      purchases: true,
    },
  });

  res.json(items);
};

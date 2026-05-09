-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "departmentCode" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "mainGroupCode" TEXT NOT NULL,
    "mainGroupName" TEXT NOT NULL,
    "subGroupCode" TEXT NOT NULL,
    "subGroupName" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "barcode" TEXT,
    "itemName" TEXT NOT NULL,
    "netSalesQuantity" DOUBLE PRECISION NOT NULL,
    "netSalesValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "id" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "purchaseValue" DOUBLE PRECISION NOT NULL,
    "returnValue" DOUBLE PRECISION NOT NULL,
    "purchaseReturnRate" DOUBLE PRECISION,
    "bonusQuantity" DOUBLE PRECISION NOT NULL,
    "netPurchaseQuantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "itemName" TEXT,
    "totalSalesValue" DOUBLE PRECISION NOT NULL,
    "totalPurchaseValue" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "deadStockFlag" BOOLEAN NOT NULL DEFAULT false,
    "totalSalesQty" DOUBLE PRECISION NOT NULL,
    "totalPurchaseQty" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_itemCode_key" ON "Analytics"("itemCode");

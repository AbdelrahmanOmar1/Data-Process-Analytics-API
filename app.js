const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const dataRoutes = require("./routes/dataRoutes");
const analytics = require("./routes/analyticsRoutes");

const app = express();

const prisma = new PrismaClient();

app.use(
  cors({
     origin: "*"
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/v1", dataRoutes);
app.use("/api/v1", analytics);

module.exports = app;

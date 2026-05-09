const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const analyticsRoutes = require("./routes/anlayticsRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

module.exports = app;

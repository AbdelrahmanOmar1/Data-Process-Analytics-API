const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const dataRoutes = require("./routes/dataRoutes");
const analytics = require("./routes/analyticsRoutes");

const app = express();

const prisma = new PrismaClient();



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://data-process-analytics-api.vercel.app/"
  ]
}));
app.use(express.json());

app.use("/", dataRoutes);
app.use("/", analytics);


// handle unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
module.exports = app;

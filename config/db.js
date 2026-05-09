const { Pool } = require("pg");
const prisma = require("../prisma/prisma");
const chalk = require("chalk");

require("dotenv").config({ path: "../.env" });

//connect to the data base online
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Test to prisma ORMconst prisma = require('./db/prisma');
async function test() {
  const items = await prisma.item.findMany();
  console.log("itemss ", items);
}
test();

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

pool
  .connect()
  .then(() =>
    console.log(chalk.cyan("✅ Connected to the database successfully.")),
  )
  .catch((err) => console.error("💥 Error connecting to DB:", err));

module.exports = pool;

const { PrismaClient } = require("@prisma/client");

const chalk = require("chalk");

const prisma = new PrismaClient();

async function dbConnection() {
  try {
    await prisma.$connect();
    console.log(chalk.cyan("✅ Connected to the database successfully..."));
  } catch (error) {
    console.log(chalk.red("❌ Database connection failed:"), error);
  }
}

module.exports = dbConnection;

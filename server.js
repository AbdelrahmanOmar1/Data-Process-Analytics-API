const app = require("./app");
const chalk = require("chalk");
const dbConnection = require("./config/db");

// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    console.log(chalk.yellow(`🚀 Server is running on port ${PORT}...`));
    await dbConnection();
  } catch (err) {
    console.error("Error starting server:", err);
  }
});

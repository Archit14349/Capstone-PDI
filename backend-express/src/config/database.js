require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "eventzen",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // ✅ Disable logging for cleaner output
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ Connected to MySQL successfully"))
  .catch(err => console.error("❌ MySQL connection error:", err));

module.exports = sequelize;

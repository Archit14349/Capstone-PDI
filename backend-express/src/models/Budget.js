const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Budget = sequelize.define("Budget", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  event_id: { type: DataTypes.INTEGER, allowNull: false },
  total_budget: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  expenses: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  revenue: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = Budget;

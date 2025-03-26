const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Budget = sequelize.define("Budget", {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Events", // string ref avoids circular require
      key: "id"
    },
    onDelete: "CASCADE"
  },
  estimated_budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  actual_expense: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "Budgets",
  timestamps: false
});

module.exports = Budget;

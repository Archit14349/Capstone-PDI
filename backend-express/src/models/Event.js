const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date_time: { type: DataTypes.DATE, allowNull: false },
  venue_id: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false, defaultValue: "General" },
  theme: { type: DataTypes.STRING, allowNull: false, defaultValue: "Default Theme" },
  capacity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 10, max: 1000 } },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  tableName: "Events",
  timestamps: true
});

module.exports = Event;

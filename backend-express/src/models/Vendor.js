const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event"); // This is important!

const Vendor = sequelize.define("Vendor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  service_type: { type: DataTypes.STRING, allowNull: false },
  contact_info: { type: DataTypes.STRING, allowNull: false },
  performance_rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  event_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }
});

// ✅ Define the relationship ONCE here
Vendor.belongsTo(Event, { foreignKey: "event_id", as: "event" });

module.exports = Vendor;

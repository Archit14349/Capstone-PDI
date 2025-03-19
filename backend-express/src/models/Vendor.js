const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vendor = sequelize.define("Vendor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  service_type: { type: DataTypes.STRING, allowNull: false },
  contact_info: { type: DataTypes.STRING, allowNull: false },
  event_id: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = Vendor;

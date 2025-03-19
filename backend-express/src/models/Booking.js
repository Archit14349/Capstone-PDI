const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  event_id: { type: DataTypes.INTEGER, allowNull: false },
  num_tickets: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Booking;

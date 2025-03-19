const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venue = sequelize.define("Venue", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  amenities: { type: DataTypes.TEXT, allowNull: true },  // Amenities available
  price_per_hour: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Pricing
  status: { type: DataTypes.ENUM("Available", "Booked"), defaultValue: "Available" }  // Availability status
});

module.exports = Venue;

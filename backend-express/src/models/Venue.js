const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event");

const Venue = sequelize.define("Venue", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  amenities: { type: DataTypes.TEXT },
  price_per_hour: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: {
    type: DataTypes.ENUM("Available", "Booked"),
    allowNull: false,
    defaultValue: "Available"
  }
}, {
  tableName: "Venues",
  timestamps: false
});


Venue.hasOne(Event, { foreignKey: "venue_id", as: "event" });

module.exports = Venue;

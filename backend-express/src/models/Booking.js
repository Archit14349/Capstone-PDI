const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Attendee = require("./Attendee");
const Event = require("./Event");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  attendee_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  num_tickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});


Booking.belongsTo(Attendee, {
  foreignKey: "attendee_id",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

Booking.belongsTo(Event, {
  foreignKey: "event_id",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = Booking;

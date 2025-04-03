const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attendee = sequelize.define("Attendee", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,  
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  event_id: { type: DataTypes.INTEGER, allowNull: true },
  attended: { type: DataTypes.BOOLEAN, defaultValue: false },
  feedback: { type: DataTypes.TEXT, allowNull: true },
});

module.exports = Attendee;

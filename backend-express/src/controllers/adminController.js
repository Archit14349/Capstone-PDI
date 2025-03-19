const Booking = require("../models/Booking");
const Budget = require("../models/Budget");
const Event = require("../models/Event");

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.count();
    const totalRevenue = await Budget.sum("revenue");
    const totalExpenses = await Budget.sum("expenses");
    const totalEvents = await Event.count();

    res.status(200).json({ totalBookings, totalRevenue, totalExpenses, totalEvents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

// Get All Customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

module.exports = { getDashboardStats, getAllCustomers, getAllBookings };

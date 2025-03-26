const Booking = require("../models/Booking");
const Budget = require("../models/Budget");
const Event = require("../models/Event");

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.count();
    const totalRevenue = await Booking.sum("total_price");
    const totalExpenses = await Budget.sum("actual_expense");
    const totalEvents = await Event.count();

    res.status(200).json({ totalBookings, totalRevenue, totalExpenses, totalEvents });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

// Get All Bookings with Event Info
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: Event, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
      limit: 5
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Bookings fetch error:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

module.exports = { getDashboardStats, getAllBookings };

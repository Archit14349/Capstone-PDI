const Booking = require("../models/Booking");
const Event = require("../models/Event");

// Create a Booking
const bookEvent = async (req, res) => {
  try {
    const { customer_id, event_id, num_tickets } = req.body;
    const event = await Event.findByPk(event_id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const booking = await Booking.create({ customer_id, event_id, num_tickets });
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Get all Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

module.exports = { bookEvent, getAllBookings };

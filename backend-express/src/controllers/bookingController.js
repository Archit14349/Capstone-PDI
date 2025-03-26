const Booking = require("../models/Booking");
const Event = require("../models/Event");
const Attendee = require("../models/Attendee"); // ✅ Include attendee

// Establish relations (if not already done in model definition)
Booking.belongsTo(Event, { foreignKey: "event_id" });
Booking.belongsTo(Attendee, { foreignKey: "attendee_id" });

// Create new booking
const createBooking = async (req, res) => {
  try {
    const { attendee_id, event_id, num_tickets, message } = req.body;

    // Validate event
    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const total_price = event.price * num_tickets;

    const booking = await Booking.create({
      attendee_id,
      event_id,
      num_tickets,
      total_price,
      message
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Error in createBooking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Event,
          attributes: ["id", "name", "price"]
        },
        {
          model: Attendee,
          attributes: ["id", "name", "email"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error in getAllBookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

module.exports = {
  createBooking,
  getAllBookings
};

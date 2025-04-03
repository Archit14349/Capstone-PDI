const Event = require("../models/Event");
const Venue = require("../models/Venue");
const Booking = require("../models/Booking"); 

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date_time, venue_id, category, theme, capacity, price } = req.body;

    if (!category?.trim()) return res.status(400).json({ error: "Category is required." });
    if (!theme?.trim()) return res.status(400).json({ error: "Theme is required." });
    if (capacity < 10 || capacity > 1000) {
      return res.status(400).json({ error: "Capacity must be between 10 and 1000." });
    }

    const newEvent = await Event.create({
      name, description, date_time, venue_id, category, theme, capacity, price
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { name, description, date_time, venue_id, category, theme, capacity, price } = req.body;

    if (!category?.trim()) return res.status(400).json({ error: "Category is required." });
    if (!theme?.trim()) return res.status(400).json({ error: "Theme is required." });
    if (capacity < 10 || capacity > 1000) {
      return res.status(400).json({ error: "Capacity must be between 10 and 1000." });
    }

    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.update({ name, description, date_time, venue_id, category, theme, capacity, price });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
  
      
      await Booking.destroy({ where: { event_id: event.id } });
  
      
      const venueId = event.venue_id;
      await event.destroy();
      await Venue.update({ status: "Available" }, { where: { id: venueId } });
  
      res.json({ message: "Event and related bookings deleted. Venue set to Available." });
    } catch (error) {
      console.error(" Error deleting event:", error);
      res.status(500).json({ error: error.message });
    }
  };

exports.assignVenueToEvent = async (req, res) => {
    try {
      const { eventId, venueId } = req.body;
  
      if (!eventId || !venueId) {
        return res.status(400).json({ error: "Event ID and Venue ID are required." });
      }
  
      const event = await Event.findByPk(eventId);
      const venue = await Venue.findByPk(venueId);
  
      if (!event || !venue) {
        return res.status(404).json({ error: "Event or Venue not found" });
      }
  
      
      event.venue_id = venueId;
      await event.save();
  
      
      await Venue.update({ status: "Booked" }, { where: { id: venueId } });
  
      return res.json({ message: "Venue assigned and status updated", event });
    } catch (error) {
      console.error(" Error assigning venue:", error);
      return res.status(500).json({ error: error.message });
    }
  };
  
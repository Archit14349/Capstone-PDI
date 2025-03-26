const Venue = require("../models/Venue");
const Event = require("../models/Event");

const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll({
      attributes: ["id", "name", "location", "capacity", "amenities", "price_per_hour", "status"],
      include: [{
        model: Event,
        as: "event",
        attributes: ["id", "name"]
      }]
    });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Error fetching venues", error });
  }
};

const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Error fetching venue", error });
  }
};

const createVenue = async (req, res) => {
  try {
    const { name, location, capacity, amenities, price_per_hour } = req.body;

    const venue = await Venue.create({
      name, location, capacity, amenities, price_per_hour, status: "Available"
    });

    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Error creating venue", error });
  }
};

const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    await venue.update(req.body);
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    await venue.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting venue", error });
  }
};

const bookVenue = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    if (venue.status === "Booked") {
      return res.status(400).json({ message: "Venue is already booked!" });
    }

    await venue.update({ status: "Booked" });
    res.status(200).json({ message: "Venue booked successfully!", venue });
  } catch (error) {
    res.status(500).json({ message: "Error booking venue", error });
  }
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
  bookVenue
};

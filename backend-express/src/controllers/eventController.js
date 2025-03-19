const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date_time, venue_id, category, theme, capacity, price } = req.body;

        if (!category || category.trim() === "") {
            return res.status(400).json({ error: "Category is required." });
        }
        if (!theme || theme.trim() === "") {
            return res.status(400).json({ error: "Theme is required." });
        }
        if (capacity < 10 || capacity > 1000) {
            return res.status(400).json({ error: "Capacity must be between 10 and 1000." });
        }

        const newEvent = await Event.create({ name, description, date_time, venue_id, category, theme, capacity, price });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { name, description, date_time, venue_id, category, theme, capacity, price } = req.body;

        if (!category || category.trim() === "") {
            return res.status(400).json({ error: "Category is required." });
        }
        if (!theme || theme.trim() === "") {
            return res.status(400).json({ error: "Theme is required." });
        }
        if (capacity < 10 || capacity > 1000) {
            return res.status(400).json({ error: "Capacity must be between 10 and 1000." });
        }

        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        await event.update({ name, description, date_time, venue_id, category, theme, capacity, price });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            attributes: ["id", "name", "description", "date_time", "venue_id", "category", "theme", "capacity", "price"]
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        await event.destroy();
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

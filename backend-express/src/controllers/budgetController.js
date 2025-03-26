const Budget = require("../models/Budget");
const Event = require("../models/Event");
const Venue = require("../models/Venue");
const Booking = require("../models/Booking");

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll({
      include: [{ model: Event, attributes: ["id", "name", "price", "venue_id", "capacity"] }]
    });

    const enriched = await Promise.all(budgets.map(async (budget) => {
      const bookings = await Booking.findAll({
        where: { event_id: budget.event_id }
      });

      const revenue = bookings.reduce((acc, b) => acc + parseFloat(b.total_price), 0);
      const profit = revenue - budget.actual_expense;

      return {
        eventName: budget.Event.name,
        estimated_budget: budget.estimated_budget,
        actual_expense: budget.actual_expense,
        revenue,
        profit
      };
    }));

    res.status(200).json(enriched);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Failed to retrieve budget data." });
  }
};

const createOrUpdateBudget = async (req, res) => {
  try {
    const { event_id, estimated_budget } = req.body;

    // Get event and venue details
    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const venue = await Venue.findByPk(event.venue_id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });

    const eventCost = parseFloat(event.price);
    const venueCost = parseFloat(venue.price_per_hour) * 2; // assuming 2 hours
    const actual_expense = eventCost + venueCost;

    // Save or update budget
    const [budget, created] = await Budget.upsert({
      event_id,
      estimated_budget,
      actual_expense
    });

    res.status(201).json({ message: "Budget saved successfully." });
  } catch (error) {
    console.error("Error saving budget:", error);
    res.status(500).json({ error: "Failed to save budget." });
  }
};

module.exports = {
  getAllBudgets,
  createOrUpdateBudget
};

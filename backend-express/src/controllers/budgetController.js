const Budget = require("../models/Budget");

// Get all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budgets", error });
  }
};

// Get budget by Event ID
const getBudgetByEvent = async (req, res) => {
  try {
    const budget = await Budget.findOne({ where: { event_id: req.params.event_id } });
    if (!budget) return res.status(404).json({ message: "Budget not found for this event" });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget", error });
  }
};

// Create a new budget
const createBudget = async (req, res) => {
  try {
    const budget = await Budget.create(req.body);
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error creating budget", error });
  }
};

// Update a budget
const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ where: { event_id: req.params.event_id } });
    if (!budget) return res.status(404).json({ message: "Budget not found for this event" });

    await budget.update(req.body);
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error updating budget", error });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ where: { event_id: req.params.event_id } });
    if (!budget) return res.status(404).json({ message: "Budget not found for this event" });

    await budget.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting budget", error });
  }
};

module.exports = { getAllBudgets, getBudgetByEvent, createBudget, updateBudget, deleteBudget };

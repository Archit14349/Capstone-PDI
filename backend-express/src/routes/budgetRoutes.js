const express = require("express");
const router = express.Router();
const { getAllBudgets, getBudgetByEvent, createBudget, updateBudget, deleteBudget } = require("../controllers/budgetController");

router.get("/", getAllBudgets);
router.get("/:event_id", getBudgetByEvent);
router.post("/", createBudget);
router.put("/:event_id", updateBudget);
router.delete("/:event_id", deleteBudget);

module.exports = router;

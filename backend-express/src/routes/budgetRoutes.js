const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

router.get("/", budgetController.getAllBudgets);
router.post("/", budgetController.createOrUpdateBudget);

module.exports = router;

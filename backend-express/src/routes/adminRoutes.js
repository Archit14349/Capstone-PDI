const express = require("express");
const router = express.Router();
const { getDashboardStats, getAllBookings } = require("../controllers/adminController");

router.get("/dashboard", getDashboardStats);
router.get("/bookings", getAllBookings);

module.exports = router;

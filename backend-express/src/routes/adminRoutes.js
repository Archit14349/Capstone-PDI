const express = require("express");
const router = express.Router();
const { getDashboardStats, getAllCustomers, getAllBookings } = require("../controllers/adminController");

router.get("/dashboard", getDashboardStats);
router.get("/customers", getAllCustomers);
router.get("/bookings", getAllBookings);

module.exports = router;

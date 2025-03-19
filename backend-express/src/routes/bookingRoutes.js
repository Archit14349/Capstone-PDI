const express = require("express");
const router = express.Router();
const { bookEvent, getAllBookings } = require("../controllers/bookingController");

router.post("/", bookEvent);
router.get("/", getAllBookings);

module.exports = router;

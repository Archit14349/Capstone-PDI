const express = require("express");
const router = express.Router();
const { getAllVenues, getVenueById, createVenue, updateVenue, deleteVenue, bookVenue } = require("../controllers/venueController");

router.get("/", getAllVenues);
router.get("/:id", getVenueById);
router.post("/", createVenue);
router.put("/:id", updateVenue);
router.delete("/:id", deleteVenue);
router.post("/:id/book", bookVenue);  // ✅ Corrected Booking Route

module.exports = router;

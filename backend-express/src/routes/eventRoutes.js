const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// 🔥 Always put static paths first before dynamic ones
router.put("/assign-venue", eventController.assignVenueToEvent); // ✅ this first!

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;

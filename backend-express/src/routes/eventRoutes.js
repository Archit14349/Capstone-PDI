const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.put("/assign-venue", eventController.assignVenueToEvent); 

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;

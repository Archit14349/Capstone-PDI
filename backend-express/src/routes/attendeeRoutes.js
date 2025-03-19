const express = require("express");
const router = express.Router();
const { getAllAttendees, createAttendee, registerForEvent, markAttendance, sendReminder, collectFeedback } = require("../controllers/attendeeController");

router.get("/", getAllAttendees);
router.post("/", createAttendee);
router.put("/:id/register", registerForEvent);
router.put("/:id/attendance", markAttendance);
router.post("/:id/reminder", sendReminder);
router.put("/:id/feedback", collectFeedback);

module.exports = router;

const Attendee = require("../models/Attendee");

const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.findAll();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendees", error });
  }
};


const createAttendee = async (req, res) => {
  try {
    const { name, email, event_id } = req.body;
    const attendee = await Attendee.create({ name, email, event_id });

    res.status(201).json(attendee);
  } catch (error) {
    res.status(500).json({ message: "Error creating attendee", error });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);
    if (!attendee) return res.status(404).json({ message: "Attendee not found" });

    attendee.event_id = req.body.event_id;
    await attendee.save();
    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ message: "Error registering attendee", error });
  }
};


const markAttendance = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);
    if (!attendee) return res.status(404).json({ message: "Attendee not found" });

    attendee.attended = true;
    await attendee.save();
    res.status(200).json({ message: "Attendance marked", attendee });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};


const sendReminder = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);
    if (!attendee) return res.status(404).json({ message: "Attendee not found" });

    console.log(`📩 Reminder Sent to: ${attendee.email}`);
    res.status(200).json({ message: "Reminder sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reminder", error });
  }
};


const collectFeedback = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);
    if (!attendee) return res.status(404).json({ message: "Attendee not found" });

    attendee.feedback = req.body.feedback;
    await attendee.save();
    res.status(200).json({ message: "Feedback recorded", attendee });
  } catch (error) {
    res.status(500).json({ message: "Error collecting feedback", error });
  }
};

module.exports = { getAllAttendees, createAttendee, registerForEvent, markAttendance, sendReminder, collectFeedback };

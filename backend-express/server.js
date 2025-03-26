const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Load Models
const Event = require("./src/models/Event");
const Venue = require("./src/models/Venue");
const Attendee = require("./src/models/Attendee");
const Vendor = require("./src/models/Vendor");
const Budget = require("./src/models/Budget");
const Booking = require("./src/models/Booking");

// ✅ Define Associations centrally to avoid circular imports
Event.hasOne(Budget, { foreignKey: "event_id", onDelete: "CASCADE" });
Budget.belongsTo(Event, { foreignKey: "event_id", onDelete: "CASCADE" });

Booking.belongsTo(Event, { foreignKey: "event_id", onDelete: "CASCADE" });
Event.hasMany(Booking, { foreignKey: "event_id", onDelete: "CASCADE" });

// ✅ Import Routes
const eventRoutes = require("./src/routes/eventRoutes");
const venueRoutes = require("./src/routes/venueRoutes");
const attendeeRoutes = require("./src/routes/attendeeRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const budgetRoutes = require("./src/routes/budgetRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const adminRoutes = require("./src/routes/adminRoutes"); // ✅ Admin routes added

// ✅ Use Routes
app.use("/api/events", eventRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes); // ✅ Admin route registered

console.log("✅ All Routes Registered");

app.get("/", (req, res) => {
  res.send("✅ Express Server is Running!");
});

// ✅ Sync Database
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced successfully"))
  .catch(err => console.error("❌ Database sync error:", err));

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Unexpected Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Express API running on port ${PORT}`));

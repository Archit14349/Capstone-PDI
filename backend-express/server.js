const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database"); // Ensure correct path
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const eventRoutes = require("./src/routes/eventRoutes");
const venueRoutes = require("./src/routes/venueRoutes");
const attendeeRoutes = require("./src/routes/attendeeRoutes"); // ✅ Added Attendee Routes

// ✅ Use Routes with Logging
app.use("/api/events", eventRoutes);
console.log("✅ Event Routes Registered");

app.use("/api/venues", venueRoutes);
console.log("✅ Venue Routes Registered");

app.use("/api/attendees", attendeeRoutes);
console.log("✅ Attendee Routes Registered");

app.get("/", (req, res) => {
  res.send("✅ Express Server is Running!");
});

// ✅ Sync Database
sequelize.sync({ alter: true })  // ✅ Use { alter: true } to avoid data loss
  .then(() => console.log("✅ Database synced successfully"))
  .catch(err => console.error("❌ Database sync error:", err));

// ✅ Graceful Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Unexpected Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Express API running on port ${PORT}`));

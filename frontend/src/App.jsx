import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import VenuePage from "./pages/VenuePage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AttendeesPage from "./pages/AttendeesPage";
import BudgetPage from "./pages/BudgetPage";
import VendorsPage from "./pages/VendorsPage";

const App = () => {
  return (
    <Router>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>EventZen</h2>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/events" style={styles.link}>Events</Link>
          <Link to="/venues" style={styles.link}>Venues</Link>
          <Link to="/attendees" style={styles.link}>Attendees</Link>
          <Link to="/bookings" style={styles.link}>Bookings</Link>
          <Link to="/vendors" style={styles.link}>Vendors</Link>
          <Link to="/budget" style={styles.link}>Budget</Link>
          <Link to="/admin" style={styles.link}>Admin</Link>
        </div>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/attendees" element={<AttendeesPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

// 🔹 Styling
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#004d66",
    color: "white",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  logo: { margin: 0, fontSize: "22px", fontWeight: "bold" },
  links: { display: "flex", gap: "20px" },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  }
};

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import VenuePage from "./pages/VenuePage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AttendeesPage from "./pages/AttendeesPage";
import BudgetPage from "./pages/BudgetPage";
import VendorsPage from "./pages/VendorsPage";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";
import PrivacyPage from "./pages/PrivacyPage";

import "./styles/Navbar.css";

const App = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Router>
      {/* Unified Top Navbar */}
      <nav className="navbar">
        <div className="logo">EventZen</div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/news" className="nav-link">News</Link>
          <Link to="/privacy" className="nav-link">Privacy Policy</Link>
          <Link to="/bookings" className="nav-link primary-btn">Booking Open !!</Link>
        </div>

        <div className="admin-dropdown">
          <button onClick={() => setShowDropdown(!showDropdown)} className="admin-btn">
            Team Admin ⬇
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/events">Events</Link>
              <Link to="/venues">Venues</Link>
              <Link to="/attendees">Attendees</Link>
              <Link to="/vendors">Vendors</Link>
              <Link to="/budget">Budget</Link>
              <Link to="/admin">Admin</Link>
            </div>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/attendees" element={<AttendeesPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

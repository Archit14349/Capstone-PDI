import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

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
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoginData, setAdminLoginData] = useState({
    username: "",
    password: "",
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleBookingOpenClick = () => {
    setShowLogin(true); // Always show login for booking
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      setShowLogin(false);
      navigate("/bookings");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleAdminLinkClick = (path) => {
    if (isAdminAuthenticated) {
      navigate(path);
      setShowDropdown(false);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = () => {
    if (
      adminLoginData.username === "admin" &&
      adminLoginData.password === "admin123"
    ) {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      alert("Logged in as Admin ✅");
    } else {
      alert("Invalid admin credentials ❌");
    }
  };

  const shouldHideNavbar = location.pathname === "/bookings";

  return (
    <>
      {/* Conditionally Render Navbar */}
      {!shouldHideNavbar && (
        <nav className="navbar">
          <div className="logo">EventZen</div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/privacy" className="nav-link">Privacy Policy</Link>
            <button onClick={handleBookingOpenClick} className="nav-link primary-btn">
              Booking Open !!
            </button>
          </div>

          <div className="admin-dropdown">
            <button onClick={() => setShowDropdown(!showDropdown)} className="admin-btn">
              Team Admin ⬇
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleAdminLinkClick("/events")}>Events</button>
                <button onClick={() => handleAdminLinkClick("/venues")}>Venues</button>
                <button onClick={() => handleAdminLinkClick("/attendees")}>Attendees</button>
                <button onClick={() => handleAdminLinkClick("/vendors")}>Vendors</button>
                <button onClick={() => handleAdminLinkClick("/budget")}>Budget</button>
                <button onClick={() => handleAdminLinkClick("/admin")}>Admin</button>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* 🔐 Booking Login Modal */}
      {showLogin && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.modal}>
            <h2>Please Log In</h2>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              style={popupStyles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              style={popupStyles.input}
            />
            <div style={popupStyles.btnRow}>
              <button onClick={handleLogin} style={popupStyles.loginBtn}>Login</button>
              <button onClick={() => setShowLogin(false)} style={popupStyles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔐 Admin Login Modal */}
      {showAdminLogin && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.modal}>
            <h2>Admin Login</h2>
            <input
              type="text"
              placeholder="Admin Username"
              value={adminLoginData.username}
              onChange={(e) => setAdminLoginData({ ...adminLoginData, username: e.target.value })}
              style={popupStyles.input}
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={adminLoginData.password}
              onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
              style={popupStyles.input}
            />
            <div style={popupStyles.btnRow}>
              <button onClick={handleAdminLogin} style={popupStyles.loginBtn}>Login</button>
              <button onClick={() => setShowAdminLogin(false)} style={popupStyles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    minWidth: 300,
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  loginBtn: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default App;

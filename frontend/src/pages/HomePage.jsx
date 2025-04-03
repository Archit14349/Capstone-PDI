import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "" });

  const handleBookClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
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

  const handleRegister = async () => {
    const res = await fetch("http://localhost:8081/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    if (res.ok) {
      alert("Registration successful! You can now login.");
      setShowRegister(false);
    } else {
      alert("Registration failed. Try a different username.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Left Section */}
        <div style={styles.leftSection}>
          <h1 style={styles.heading}>
            Welcome To EventZen
            <br />
            <span style={styles.highlight}>Find and Book Amazing Events Easily !!</span>
          </h1>
          <p style={styles.paragraph}>
            Every year, 600+ curious minds come here to explore various events, meet friendly people, and enjoy great time and learnings together.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={styles.button} onClick={handleBookClick}>🎟️ Book Ticket</button>
            <button style={styles.button} onClick={handleRegisterClick}>📝 Register</button>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <img
            src="https://www.pngkey.com/png/detail/484-4849304_get-your-tickets-now.png"
            alt="Event Ticket"
            style={styles.image}
          />
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>For further enquiries contact:</strong></p>
            <p style={styles.contactLine}>📧 Gmail: <a href="mailto:eventzen@gmail.com" style={styles.link}>eventzen@gmail.com</a></p>
            <p style={styles.contactLine}>📞 Phone: +91 1234567890</p>
          </div>
        </div>
      </div>

      {/* Login Popup */}
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

      {/* Register Popup */}
      {showRegister && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.modal}>
            <h2>Create an Account</h2>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              style={popupStyles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              style={popupStyles.input}
            />
            <div style={popupStyles.btnRow}>
              <button onClick={handleRegister} style={popupStyles.loginBtn}>Register</button>
              <button onClick={() => setShowRegister(false)} style={popupStyles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "90vh",
    background: "linear-gradient(135deg, #4b2dab 0%, #211a75 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
  },
  contentWrapper: {
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap"
  },
  leftSection: {
    flex: "1 1 600px",
    color: "white",
  },
  heading: {
    fontSize: "48px",
    fontWeight: "800",
    lineHeight: "1.3",
    marginBottom: "20px",
  },
  highlight: {
    color: "#ffd700"
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "30px",
    maxWidth: "600px"
  },
  button: {
    padding: "14px 28px",
    backgroundColor: "#ffd700",
    color: "#1a1a1a",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    borderRadius: "8px",
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  rightSection: {
    flex: "1 1 500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px"
  },
  image: {
    width: "100%",
    maxWidth: "450px",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  contactBox: {
    position: "relative",
    top: "20px",
    right: "-20px",
    backgroundColor: "#f9f9f9",
    padding: "14px 18px",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#333",
    width: "290px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  contactLine: {
    margin: "5px 0"
  },
  link: {
    color: "#0056b3",
    textDecoration: "none"
  }
};


const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 999
  },
  modal: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    minWidth: 300,
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: 5,
    border: "1px solid #ccc"
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15
  },
  loginBtn: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
};

export default HomePage;

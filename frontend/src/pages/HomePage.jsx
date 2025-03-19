import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.title}>Welcome to EventZen</h1>
          <p style={styles.subtitle}>Find and book amazing events easily!</p>
          <Link to="/events" style={styles.button}>Explore Events</Link>
        </div>
      </div>
    </div>
  );
};

// Styled Components
const styles = {
  container: {
    width: "100vw",  // FULL WIDTH
    height: "100vh", // FULL HEIGHT
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('https://source.unsplash.com/1920x1080/?event,concert')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for visibility
  },
  content: {
    background: "white",
    padding: "60px 100px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "600px", // Limits content width
    width: "90%", // Responsive for smaller screens
  },
  title: {
    fontSize: "42px",
    color: "#003366",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "20px",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "15px 30px",
    backgroundColor: "#0077b6",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    borderRadius: "5px",
    transition: "background 0.3s",
    display: "inline-block",
    marginTop: "20px",
  },
};

export default HomePage;

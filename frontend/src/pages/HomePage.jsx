import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
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
          <Link to="/bookings" style={styles.button}>🎟️ Book Ticket</Link>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <img
            src="https://www.pngkey.com/png/detail/484-4849304_get-your-tickets-now.png"
            alt="Event Ticket"
            style={styles.image}
          />

          {/* Moved Contact Info */}
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>For further enquiries contact:</strong></p>
            <p style={styles.contactLine}>📧 Gmail: <a href="mailto:eventzen@gmail.com" style={styles.link}>eventzen@gmail.com</a></p>
            <p style={styles.contactLine}>📞 Phone: +91 1234567890</p>
          </div>
        </div>
      </div>
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
    transition: "all 0.3s ease"
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

export default HomePage;

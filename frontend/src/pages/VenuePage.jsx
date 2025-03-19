import React, { useEffect, useState } from "react";
import { getVenues, createVenue, updateVenue, deleteVenue, bookVenue } from "../services/venueService";

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    name: "", location: "", capacity: "", amenities: "", price_per_hour: ""
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    const data = await getVenues();
    setVenues(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateVenue(formData.id, formData);
    } else {
      await createVenue(formData);
    }
    setFormData({ name: "", location: "", capacity: "", amenities: "", price_per_hour: "" });
    fetchVenues();
  };

  const handleBook = async (venueId) => {
    await bookVenue(venueId, 1); // Assume Event ID = 1
    fetchVenues();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Venue Management</h1>

      {/* Venue Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Venue Name" value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

        <input type="text" placeholder="Location" value={formData.location} 
          onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />

        <input type="number" placeholder="Capacity" value={formData.capacity} 
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required />

        <input type="text" placeholder="Amenities" value={formData.amenities} 
          onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} required />

        <input type="number" placeholder="Price per Hour ($)" value={formData.price_per_hour} 
          onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })} required />

        <button type="submit" style={styles.button}>Save Venue</button>
      </form>

      {/* Venue List */}
      <ul style={styles.venueList}>
        {venues.map(venue => (
          <li key={venue.id} style={styles.venueCard}>
            <strong>{venue.name}</strong> - {venue.location} - {venue.capacity} seats - 
            <span style={styles.price}> ${venue.price_per_hour}/hr </span>
            <span style={venue.status === "Booked" ? styles.bookedStatus : styles.availableStatus}>
              [{venue.status === "Booked" ? "Status: Booked" : "Status: Available"}]
            </span>
            {venue.status !== "Booked" && (
              <button onClick={() => handleBook(venue.id)} style={styles.bookButton}>Book</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

/** ✅ Improved Styles for 90% Zoom & Proper Alignment */
const styles = {
  container: {
    maxWidth: "85%", margin: "0 auto", padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "32px", textAlign: "center", color: "#1a1a1a", fontWeight: "bold", marginBottom: "20px"
  },
  form: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px", padding: "20px", maxWidth: "800px", margin: "0 auto", backgroundColor: "#f9f9f9",
    borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
  },
  button: {
    backgroundColor: "#007bff", color: "white", padding: "12px", border: "none",
    borderRadius: "5px", cursor: "pointer", textAlign: "center", width: "100%", fontSize: "16px"
  },
  venueList: {
    listStyle: "none", padding: 0, marginTop: "20px"
  },
  venueCard: {
    backgroundColor: "#ffffff", padding: "15px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px",
    fontSize: "18px", fontWeight: "bold"
  },
  price: {
    color: "#28a745", fontWeight: "bold"
  },
  bookedStatus: {
    color: "red", fontWeight: "bold", marginLeft: "10px"
  },
  availableStatus: {
    color: "green", fontWeight: "bold", marginLeft: "10px"
  },
  bookButton: {
    backgroundColor: "#28a745", color: "white", padding: "8px 12px", borderRadius: "5px",
    cursor: "pointer", fontSize: "14px", border: "none"
  }
};

export default VenuesPage;

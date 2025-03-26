import React, { useEffect, useState } from "react";
import { getVenues, createVenue, updateVenue, deleteVenue } from "../services/venueService";
import { getEvents, assignVenueToEvent } from "../services/eventService";

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "", location: "", capacity: "", amenities: "", price_per_hour: ""
  });

  useEffect(() => {
    fetchVenues();
    fetchEvents();
  }, []);

  const fetchVenues = async () => {
    try {
      const data = await getVenues();
      setVenues(data);
    } catch (err) {
      console.error("Error fetching venues:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.id
      ? await updateVenue(formData.id, formData)
      : await createVenue(formData);
    setFormData({ name: "", location: "", capacity: "", amenities: "", price_per_hour: "" });
    fetchVenues();
  };

  const handleAssign = async (venueId, eventId) => {
    if (!eventId) return;
    await assignVenueToEvent(eventId, venueId);
    alert(`✅ Venue assigned to event (ID: ${eventId})`);
    await fetchVenues();
  };

  const handleDeleteVenue = async (venueId) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await deleteVenue(venueId);
        alert("Venue deleted successfully");
        fetchVenues();
      } catch (err) {
        alert("Error deleting venue");
        console.error(err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏛️ Venue Management</h1>

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
        <button type="submit" style={styles.saveButton}>💾 Save Venue</button>
      </form>

      <div style={styles.venueList}>
        {venues.map((venue) => (
          <div key={venue.id} style={styles.venueCard}>
            <div style={styles.venueInfo}>
              <p style={styles.venueName}>{venue.name}</p>
              <p style={styles.meta}>
                📍 {venue.location} | 🧾 Amenities: {venue.amenities} | 🪑 {venue.capacity} seats | 💵 
                <span style={styles.price}> ${venue.price_per_hour}/hr</span>
              </p>

              {venue.status === "Booked" ? (
                <p style={styles.bookedStatus}>
                  🔒 <strong>Status:</strong> <span style={{ color: "#dc3545" }}>Booked</span>
                  {venue.event?.name && (
                    <span style={{ marginLeft: "10px", color: "#333" }}>
                      → {venue.event.name}
                    </span>
                  )}
                </p>
              ) : (
                <div style={styles.availableSection}>
                  <span style={styles.availableStatus}>🟢 Available</span>
                  <select onChange={(e) => handleAssign(venue.id, e.target.value)} defaultValue="">
                    <option value="" disabled>Assign to Event</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>{event.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              onClick={() => handleDeleteVenue(venue.id)}
              style={styles.deleteBtn}
              disabled={venue.status === "Booked"}
              title={venue.status === "Booked" ? "Unassign event first" : "Delete venue"}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f1f7ff",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "2rem",
    color: "#002B5B"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    maxWidth: "1000px",
    margin: "0 auto 30px auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  saveButton: {
    gridColumn: "1/-1",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  venueList: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  venueCard: {
    background: "#ffffff",
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  },
  venueInfo: {
    flex: 1,
    minWidth: "300px"
  },
  venueName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  meta: {
    fontSize: "14px",
    color: "#333"
  },
  price: {
    color: "#28a745",
    fontWeight: "bold",
    marginLeft: "5px"
  },
  bookedStatus: {
    marginTop: "10px",
    fontWeight: "500",
    fontSize: "15px"
  },
  availableSection: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  availableStatus: {
    color: "#28a745",
    fontWeight: "bold"
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  }
};

export default VenuesPage;

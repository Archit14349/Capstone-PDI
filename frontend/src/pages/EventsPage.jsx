import React, { useEffect, useState } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../services/eventService";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: null, name: "", description: "", date_time: "", venue_id: "", category: "", theme: "", capacity: "", price: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateEvent(formData.id, formData);
    } else {
      await createEvent(formData);
    }
    setFormData({ id: null, name: "", description: "", date_time: "", venue_id: "", category: "", theme: "", capacity: "", price: "" });
    fetchEvents();
  };

  const handleEdit = (event) => {
    setFormData(event);
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}> Event Management</h1>

      <div style={styles.formSection}>
        <h2 style={styles.subHeading}>Create / Update Event</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Event Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" />
          <input type="datetime-local" value={formData.date_time} onChange={(e) => setFormData({ ...formData, date_time: e.target.value })} required />
          <input type="text" placeholder="Venue ID" value={formData.venue_id} onChange={(e) => setFormData({ ...formData, venue_id: e.target.value })} required />
          
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
            <option value="">Select Category</option>
            <option value="Conference">Conference</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Networking">Networking</option>
          </select>

          <input type="text" placeholder="Theme" value={formData.theme} onChange={(e) => setFormData({ ...formData, theme: e.target.value })} required />
          <input type="number" placeholder="Capacity (10-1000)" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: Math.max(10, Math.min(1000, e.target.value)) })} required />
          <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          <button type="submit" style={styles.primaryButton}>{formData.id ? "Update Event" : "Create Event"}</button>
        </form>
      </div>

      <div style={styles.listSection}>
        <h2 style={styles.subHeading}>📅 Upcoming Events</h2>
        <div style={styles.eventGrid}>
          {events.length === 0 ? (
            <p style={styles.emptyText}>No events available</p>
          ) : (
            events.map(event => (
              <div key={event.id} style={styles.card}>
                <h3 style={styles.cardTitle}>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Theme:</strong> {event.theme}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>
                <p><strong>Price:</strong> ${event.price}</p>
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleEdit(event)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDelete(event.id)} style={styles.deleteBtn}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Segoe UI, sans-serif",
    background: "linear-gradient(to right, #e3f2fd, #f1f8e9)",
    padding: "2rem",
    minHeight: "100vh"
  },
  heading: {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#0d47a1",
    marginBottom: "2rem"
  },
  formSection: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    margin: "0 auto 3rem auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  subHeading: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#1976d2"
  },
  primaryButton: {
    padding: "0.75rem",
    backgroundColor: "#43a047",
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  listSection: {
    paddingTop: "1rem"
  },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
    cursor: "default"
  },
  cardTitle: {
    color: "#1565c0",
    fontSize: "1.3rem",
    marginBottom: "0.5rem"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem"
  },
  editBtn: {
    backgroundColor: "#1e88e5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer"
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.1rem"
  }
};

export default EventsPage;

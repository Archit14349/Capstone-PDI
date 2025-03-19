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
    <div style={styles.pageContainer}>
      <h1 style={styles.mainTitle}>Event Management</h1>

      {/* Create / Update Event Form */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Create / Update Event</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Event Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3"></textarea>
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
          <input type="number" placeholder="Capacity (10-1000)" value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: Math.max(10, Math.min(1000, e.target.value)) })} required />
          <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          <button type="submit" style={styles.createButton}>{formData.id ? "Update Event" : "Create Event"}</button>
        </form>
      </div>

      {/* Upcoming Events List */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Upcoming Events</h2>
        <div style={styles.eventList}>
          {events.length === 0 ? (
            <p style={styles.noEvents}>No events available</p>
          ) : (
            events.map(event => (
              <div key={event.id} style={styles.eventCard}>
                <h3 style={styles.eventTitle}>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Theme:</strong> {event.theme}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>
                <p><strong>Price:</strong> ${event.price}</p>
                <div style={styles.buttonContainer}>
                  <button style={styles.editButton} onClick={() => handleEdit(event)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/** ✅ Improved CSS for 100% Zoom & Better Layout */
const styles = {
  pageContainer: { 
    maxWidth: "90%", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif"
  },
  mainTitle: { 
    fontSize: "36px", textAlign: "center", marginBottom: "20px", color: "#333"
  },
  section: { 
    marginBottom: "40px", padding: "20px", borderRadius: "10px", backgroundColor: "#f8f9fa"
  },
  sectionTitle: { 
    fontSize: "24px", marginBottom: "15px", textAlign: "center", color: "#0056b3"
  },
  form: { 
    display: "grid", gap: "10px", padding: "10px", maxWidth: "600px", margin: "0 auto"
  },
  eventList: { 
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px"
  },
  eventCard: { 
    backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", transition: "transform 0.3s"
  },
  eventCardHover: { transform: "scale(1.05)" },
  eventTitle: { 
    fontSize: "22px", color: "#007bff", marginBottom: "10px"
  },
  createButton: { 
    backgroundColor: "#28a745", color: "white", padding: "12px", cursor: "pointer", borderRadius: "5px", border: "none", width: "100%", fontSize: "16px"
  },
  buttonContainer: { 
    display: "flex", justifyContent: "space-between", marginTop: "10px"
  },
  editButton: { 
    backgroundColor: "#007bff", color: "white", padding: "10px", cursor: "pointer", borderRadius: "5px", width: "48%", fontSize: "14px"
  },
  deleteButton: { 
    backgroundColor: "red", color: "white", padding: "10px", cursor: "pointer", borderRadius: "5px", width: "48%", fontSize: "14px"
  },
  noEvents: { 
    textAlign: "center", fontSize: "18px", color: "#555"
  }
};

export default EventsPage;

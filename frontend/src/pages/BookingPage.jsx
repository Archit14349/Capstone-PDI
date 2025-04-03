import React, { useEffect, useState } from "react";
import { getBookings, createBooking } from "../services/bookingService";
import { getEvents } from "../services/eventService";
import { createAttendee } from "../services/attendeeService";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    event_id: "",
    num_tickets: 1,
    message: ""
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const bookingsData = await getBookings();
    const eventsData = await getEvents();
    setBookings(bookingsData);
    setEvents(eventsData);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendee = await createAttendee({ name: form.name, email: form.email });
    await createBooking({
      attendee_id: attendee.id,
      event_id: form.event_id,
      num_tickets: form.num_tickets,
      message: form.message
    });
    setForm({ name: "", email: "", event_id: "", num_tickets: 1, message: "" });
    fetchAll();
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}> Explore & Book Events</h2>

      <div style={styles.eventGrid}>
        {events.map(event => (
          <div key={event.id} style={styles.eventCard}>
            <h3 style={styles.eventName}>{event.name}</h3>
            <p><strong>📅 Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
            <p><strong>📍 Venue:</strong> {event.venue_id}</p>
            <p>{event.description}</p>
            <p><strong>💵 Price:</strong> ${event.price}</p>
          </div>
        ))}
      </div>

      <h3 style={styles.sectionTitle}>📝 Book Tickets</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <select name="event_id" value={form.event_id} onChange={handleChange} required>
          <option value="">Select Event</option>
          {events.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        <input type="number" name="num_tickets" value={form.num_tickets} onChange={handleChange} min="1" />
        <textarea name="message" placeholder="Message to Organizer" value={form.message} onChange={handleChange} />
        <button type="submit" style={styles.submitBtn}>Book Now</button>
      </form>

      <h3 style={styles.sectionTitle}>📋 Your Bookings</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Attendee</th>
              <th>Event</th>
              <th>Tickets</th>
              <th>Total Price</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.attendee?.name || b.attendee_id}</td>
                <td>{b.event?.name || b.event_id}</td>
                <td>{b.num_tickets}</td>
                <td>${b.total_price}</td>
                <td>{b.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f5f9ff",
    minHeight: "100vh"
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#003366"
  },
  sectionTitle: {
    fontSize: "24px",
    margin: "40px 0 20px",
    color: "#222"
  },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease-in-out"
  },
  eventName: {
    fontSize: "20px",
    color: "#0055cc",
    marginBottom: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    maxWidth: "600px"
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)"
  },
  th: {
    backgroundColor: "#0066cc",
    color: "#fff",
    padding: "12px",
    textAlign: "left"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    textAlign: "left"
  }
};

export default BookingPage;

import React, { useEffect, useState } from "react";
import { getAttendees, createAttendee, registerForEvent, deleteAttendee, markAttendance, sendReminder } from "../services/attendeeService";

const AttendeesPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", event_id: "" });

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const data = await getAttendees();
      setAttendees(data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.event_id) {
      alert("Please fill in all fields.");
      return;
    }
    await createAttendee(formData);
    setFormData({ name: "", email: "", event_id: "" });
    fetchAttendees();
  };

  const handleRegister = async (id, event_id) => {
    await registerForEvent(id, event_id);
    fetchAttendees();
  };

  const handleDelete = async (id) => {
    await deleteAttendee(id);
    fetchAttendees();
  };

  const handleMarkAttendance = async (id) => {
    await markAttendance(id);
    fetchAttendees();
  };

  const handleSendReminder = async (id) => {
    await sendReminder(id);
  };

  return (
    <div style={styles.container}>
      <h1>Attendee Management</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        
        <input type="email" placeholder="Email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        
        <input type="number" placeholder="Event ID" value={formData.event_id}
          onChange={(e) => setFormData({ ...formData, event_id: e.target.value })} required />
        
        <button type="submit" style={styles.button}>Add Attendee</button>
      </form>

      {/* Attendees List */}
      <div style={styles.attendeeList}>
        {attendees.map(attendee => (
          <div key={attendee.id} style={styles.attendeeCard}>
            <div style={styles.attendeeInfo}>
              <strong>{attendee.name}</strong> - {attendee.email}
              <span style={styles.status}>
                {attendee.attended ? "✅ Attended" : "❌ Not Attended"}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionContainer}>
              <button onClick={() => handleRegister(attendee.id, attendee.event_id)} style={styles.actionButton}>Register</button>
              <button onClick={() => handleMarkAttendance(attendee.id)} style={styles.actionButton}>Mark Attendance</button>
              <button onClick={() => handleSendReminder(attendee.id)} style={styles.actionButton}>Send Reminder</button>
              <button onClick={() => handleDelete(attendee.id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** ✅ Updated Styles */
const styles = {
  container: {
    maxWidth: "75%",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    padding: "20px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  },
  attendeeList: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  attendeeCard: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  attendeeInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "16px",
    marginBottom: "10px",
  },
  status: {
    fontWeight: "bold",
    marginTop: "5px",
  },
  actionContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  actionButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "14px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "14px",
  },
};

export default AttendeesPage;

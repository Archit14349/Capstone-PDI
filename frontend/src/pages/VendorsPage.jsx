import React, { useEffect, useState } from "react";
import {
  getVendors,
  createVendor,
  assignVendorToEvent,
  updatePerformance,
  deleteVendor,
  getEvents
} from "../services/vendorService";

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: "", service_type: "", contact_info: "", performance_rating: 0 });
  const [assignData, setAssignData] = useState({ vendorId: "", eventId: "" });

  useEffect(() => {
    fetchVendors();
    fetchEvents();
  }, []);

  const fetchVendors = async () => {
    const data = await getVendors();
    setVendors(data);
  };

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssignChange = e => {
    setAssignData({ ...assignData, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    await createVendor(form);
    setForm({ name: "", service_type: "", contact_info: "", performance_rating: 0 });
    fetchVendors();
  };

  const handleAssign = async e => {
    e.preventDefault();
    try {
      await assignVendorToEvent(assignData.vendorId, assignData.eventId);
      alert("Vendor assigned successfully!");
      fetchVendors();
    } catch {
      alert("Failed to assign vendor.");
    }
  };

  const handleRatingChange = async (id, rating) => {
    await updatePerformance(id, rating);
    fetchVendors();
  };

  const handleDelete = async (vendorId) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      await deleteVendor(vendorId);
      fetchVendors();
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Registered Vendors</h1>

      <div style={styles.container}>
        {/* Left Panel - Forms */}
        <div style={styles.leftPanel}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Create New Vendor</h2>
            <form onSubmit={handleCreate} style={styles.form}>
              <input name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required />
              <input name="service_type" placeholder="Service Type" value={form.service_type} onChange={handleInputChange} required />
              <input name="contact_info" placeholder="Contact Info" value={form.contact_info} onChange={handleInputChange} required />
              <input name="performance_rating" type="number" step="0.1" max="5" value={form.performance_rating} onChange={handleInputChange} />
              <button type="submit" style={styles.addButton}>Add Vendor</button>
            </form>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Assign Vendor to Event</h2>
            <form onSubmit={handleAssign} style={styles.form}>
              <select name="vendorId" value={assignData.vendorId} onChange={handleAssignChange} required>
                <option value="">Select Vendor</option>
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>

              <select name="eventId" value={assignData.eventId} onChange={handleAssignChange} required>
                <option value="">Select Event</option>
                {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>

              <button type="submit" style={styles.assignButton}>Assign</button>
            </form>
          </div>
        </div>

        {/* Right Panel - Vendor List */}
        <div style={styles.rightPanel}>
          {vendors.map(v => (
            <div key={v.id} style={styles.vendorCard}>
              <p><strong>{v.name}</strong> - {v.service_type}</p>
              <p>📞 {v.contact_info} | ⭐ Rating: {v.performance_rating}</p>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                Assigned Event: {v.event ? `${v.event.name} (ID: ${v.event.id})` : "None"}
              </p>

              <div style={styles.ratingSection}>
                <label>Update Rating:</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  onBlur={(e) => handleRatingChange(v.id, e.target.value)}
                  style={styles.ratingInput}
                />
              </div>

              <button onClick={() => handleDelete(v.id)} style={styles.deleteButton}>
                Delete Vendor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "1rem 2rem 2rem 2rem",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f1f7ff",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    color: "#033E6B",
    fontSize: "2rem",
    margin: "0.5rem 0 1rem 0", 
    paddingTop: "0.5rem"   
  },
  
  container: {
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  leftPanel: {
    flex: "1",
    minWidth: "300px"
  },
  rightPanel: {
    flex: "2",
    minWidth: "350px"
  },
  section: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "2rem"
  },
  sectionTitle: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    color: "#0d47a1"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem"
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "0.6rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  assignButton: {
    backgroundColor: "#1565c0",
    color: "white",
    padding: "0.6rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  vendorCard: {
    background: "#fff",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",
    gap: "0.5rem"
  },
  ratingInput: {
    width: "60px",
    padding: "0.2rem"
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "0.4rem 0.8rem",
    marginTop: "0.7rem",
    cursor: "pointer"
  }
};

export default VendorsPage;

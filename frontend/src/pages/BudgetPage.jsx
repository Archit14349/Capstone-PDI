import React, { useEffect, useState } from "react";
import { getBudgets, createBudget } from "../services/budgetService";
import { getEvents } from "../services/eventService";
import { getVenues } from "../services/venueService";
import { getVendors } from "../services/vendorService";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ event_id: "", estimated_budget: "" });

  useEffect(() => {
    fetchBudgets();
    fetchEvents();
    fetchVenues();
    fetchVendors();
  }, []);

  const fetchBudgets = async () => setBudgets(await getBudgets());
  const fetchEvents = async () => setEvents(await getEvents());
  const fetchVenues = async () => setVenues(await getVenues());
  const fetchVendors = async () => setVendors(await getVendors());

  const calculateExpense = (eventId) => {
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) return 0;

    const venue = venues.find(v => v.id === event.venue_id);
    const venueCost = venue ? parseFloat(venue.price_per_hour || 0) : 0;

    const vendorCosts = vendors
      .filter(v => v.event_id === event.id)
      .reduce((sum, v) => sum + parseFloat(v.cost || 0), 0);

    return venueCost + vendorCosts;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.event_id || !form.estimated_budget) {
      return alert("Please fill all required fields.");
    }

    const actual_expense = calculateExpense(form.event_id);

    await createBudget({
      event_id: form.event_id,
      estimated_budget: form.estimated_budget,
      actual_expense
    });

    setForm({ event_id: "", estimated_budget: "" });
    fetchBudgets();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>💰 Event Budgets & Financial Reports</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="event_id"
          value={form.event_id}
          onChange={(e) => setForm({ ...form, event_id: e.target.value })}
          required
          style={styles.select}
        >
          <option value="">Select Event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="estimated_budget"
          placeholder="Estimated Budget"
          value={form.estimated_budget}
          onChange={(e) => setForm({ ...form, estimated_budget: e.target.value })}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Save Budget</button>
      </form>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>📅 Event</th>
              <th>💸 Estimated</th>
              <th>💰 Actual</th>
              <th>📈 Revenue</th>
              <th>📊 Profit / Loss</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map(b => (
              <tr key={b.id}>
                <td>{b.eventName}</td>
                <td>${b.estimated_budget}</td>
                <td>${b.actual_expense}</td>
                <td>${b.revenue}</td>
                <td style={{ color: b.profit >= 0 ? "green" : "red", fontWeight: "bold" }}>
                  ${b.profit.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "2rem",
    background: "#f5f9ff",
    fontFamily: "Segoe UI, sans-serif",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    color: "#003B5C",
    marginBottom: "2rem"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "30px"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "200px"
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "200px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  tableContainer: {
    overflowX: "auto",
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center"
  },
  th: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    padding: "12px"
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  }
};

export default BudgetPage;

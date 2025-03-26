import React, { useEffect, useState } from "react";
import { getDashboardStats, getBookings } from "../services/adminService";
import "../styles/AdminDashboard.css";


const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getBookings().then(setBookings);
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">📊 Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <p>Total Bookings</p>
          <h2>{stats.totalBookings ?? 0}</h2>
        </div>
        <div className="card">
          <p>Total Revenue</p>
          <h2>${stats.totalRevenue ?? 0}</h2>
        </div>
        <div className="card">
          <p>Total Expenses</p>
          <h2>${stats.totalExpenses ?? 0}</h2>
        </div>
        <div className="card">
          <p>Total Events</p>
          <h2>{stats.totalEvents ?? 0}</h2>
        </div>
      </div>

      <div className="recent-bookings">
        <h2>🕒 Recent Bookings</h2>
        <ul>
          {bookings.length === 0 ? (
            <li>No bookings found.</li>
          ) : (
            bookings.map((booking) => (
              <li key={booking.id}>
  🎟 <strong>{booking.num_tickets}</strong> ticket(s) booked for <em>Event</em> — <strong>${booking.total_price}</strong>
</li>

            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

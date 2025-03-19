import React, { useEffect, useState } from "react";
import { getDashboardStats, getBookings } from "../services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getBookings().then(setBookings);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Statistics</h2>
      <p>Total Bookings: {stats.totalBookings}</p>
      <p>Total Revenue: ${stats.totalRevenue}</p>
      <p>Total Expenses: ${stats.totalExpenses}</p>
      <p>Total Events: {stats.totalEvents}</p>

      <h2>Recent Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            Customer {booking.customerId} booked {booking.numTickets} tickets for event {booking.eventId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

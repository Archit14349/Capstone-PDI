import React, { useState } from "react";
import { bookEvent } from "../services/bookingService";

const BookingPage = () => {
  const [eventId, setEventId] = useState("");
  const [numTickets, setNumTickets] = useState("");

  const handleBooking = async () => {
    await bookEvent({ customer_id: 1, event_id: eventId, num_tickets: numTickets });
  };

  return (
    <div>
      <h1>Book Event</h1>
      <input placeholder="Event ID" onChange={(e) => setEventId(e.target.value)} />
      <input placeholder="Tickets" onChange={(e) => setNumTickets(e.target.value)} />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingPage;

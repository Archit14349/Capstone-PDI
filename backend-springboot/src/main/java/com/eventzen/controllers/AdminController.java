package com.eventzen.controllers;

import com.eventzen.entities.Booking;
import com.eventzen.entities.Budget;
import com.eventzen.repositories.BookingRepository;
import com.eventzen.repositories.BudgetRepository;
import com.eventzen.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private EventRepository eventRepository;

    // Dashboard Statistics
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings", bookingRepository.count());
        stats.put("totalRevenue", budgetRepository.sumRevenue());
        stats.put("totalExpenses", budgetRepository.sumExpenses());
        stats.put("totalEvents", eventRepository.count());
        return stats;
    }

    // Fetch all bookings
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}

package com.eventzen.controllers;

import com.eventzen.entities.Booking;
import com.eventzen.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking bookEvent(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }
}

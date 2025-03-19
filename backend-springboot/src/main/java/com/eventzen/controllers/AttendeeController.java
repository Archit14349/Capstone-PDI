package com.eventzen.controllers;

import com.eventzen.entities.Attendee;
import com.eventzen.repositories.AttendeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendees")
public class AttendeeController {

    @Autowired
    private AttendeeRepository attendeeRepository;

    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Attendee> getAttendeeById(@PathVariable Long id) {
        return attendeeRepository.findById(id);
    }

    @PostMapping
    public Attendee createAttendee(@RequestBody Attendee attendee) {
        return attendeeRepository.save(attendee);
    }

    @PutMapping("/{id}/register")
    public Attendee registerForEvent(@PathVariable Long id, @RequestBody Attendee attendeeDetails) {
        return attendeeRepository.findById(id).map(attendee -> {
            attendee.setEventId(attendeeDetails.getEventId());
            return attendeeRepository.save(attendee);
        }).orElseThrow(() -> new RuntimeException("Attendee not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteAttendee(@PathVariable Long id) {
        attendeeRepository.deleteById(id);
    }
}

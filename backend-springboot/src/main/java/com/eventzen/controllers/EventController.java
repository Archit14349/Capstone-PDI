package com.eventzen.controllers;

import com.eventzen.entities.Event;
import com.eventzen.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        return eventRepository.findById(id).map(event -> {
            event.setName(eventDetails.getName());
            event.setDescription(eventDetails.getDescription());
            event.setDateTime(eventDetails.getDateTime());
            event.setVenueId(eventDetails.getVenueId());
            event.setCapacity(eventDetails.getCapacity());
            event.setPrice(eventDetails.getPrice());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }
}

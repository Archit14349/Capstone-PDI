package com.eventzen.controllers;

import com.eventzen.entities.Venue;
import com.eventzen.repositories.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueRepository venueRepository;

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Venue> getVenueById(@PathVariable Long id) {
        return venueRepository.findById(id);
    }

    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueRepository.save(venue);
    }

    @PutMapping("/{id}")
    public Venue updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
        return venueRepository.findById(id).map(venue -> {
            venue.setName(venueDetails.getName());
            venue.setLocation(venueDetails.getLocation());
            venue.setCapacity(venueDetails.getCapacity());
            return venueRepository.save(venue);
        }).orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteVenue(@PathVariable Long id) {
        venueRepository.deleteById(id);
    }
}

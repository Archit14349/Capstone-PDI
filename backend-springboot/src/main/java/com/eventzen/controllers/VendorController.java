package com.eventzen.controllers;

import com.eventzen.entities.Vendor;
import com.eventzen.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorRepository vendorRepository;

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Vendor> getVendorById(@PathVariable Long id) {
        return vendorRepository.findById(id);
    }

    @PostMapping
    public Vendor createVendor(@RequestBody Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    @PutMapping("/{id}/assign")
    public Vendor assignVendorToEvent(@PathVariable Long id, @RequestBody Vendor vendorDetails) {
        return vendorRepository.findById(id).map(vendor -> {
            vendor.setEventId(vendorDetails.getEventId());
            return vendorRepository.save(vendor);
        }).orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteVendor(@PathVariable Long id) {
        vendorRepository.deleteById(id);
    }
}

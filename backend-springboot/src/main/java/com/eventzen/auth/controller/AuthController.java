package com.eventzen.auth.controller;

import com.eventzen.auth.model.User;
import com.eventzen.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return ResponseEntity.ok(service.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        return service.login(user)
                .map(token -> ResponseEntity.ok(Map.of("token", token)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello(Principal principal) {
        return ResponseEntity.ok("Hello, " + principal.getName() + "! You are authenticated.");
    }

    // ✅ Return list of all registered users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }
}

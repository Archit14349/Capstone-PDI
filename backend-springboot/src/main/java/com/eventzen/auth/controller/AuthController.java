package com.eventzen.auth.controller;

import com.eventzen.auth.model.User;
import com.eventzen.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired private AuthService service;

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
}

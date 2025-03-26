package com.eventzen.auth.service;

import com.eventzen.auth.model.User;
import com.eventzen.auth.repository.UserRepository;
import com.eventzen.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwt;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder encoder;

    public String register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "Registered";
    }

    public Optional<String> login(User user) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                return Optional.of(jwt.generateToken(user.getUsername()));
            }
        } catch (AuthenticationException e) {
            return Optional.empty();
        }

        return Optional.empty();
    }

    // ✅ Fetch all users from DB
    public List<User> getAllUsers() {
        return repo.findAll();
    }
}

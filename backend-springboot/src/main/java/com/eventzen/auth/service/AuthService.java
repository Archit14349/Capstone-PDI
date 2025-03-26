package com.eventzen.auth.service;

import com.eventzen.auth.model.User;
import com.eventzen.auth.repository.UserRepository;
import com.eventzen.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwt;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(User user) {
        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repo.save(user);
        return "User registered successfully";
    }

    public Optional<String> login(User user) {
        Optional<User> existing = repo.findByUsername(user.getUsername());
        if (existing.isPresent()) {
            User dbUser = existing.get();

            // Compare raw password with encoded one
            if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                String token = jwt.generateToken(user.getUsername());
                return Optional.of(token);
            }
        }
        return Optional.empty();
    }
}

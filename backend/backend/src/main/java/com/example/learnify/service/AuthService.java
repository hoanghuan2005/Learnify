package com.example.learnify.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.learnify.dtos.RegisterRequest;
import com.example.learnify.entity.User;
import com.example.learnify.enums.UserRole;
import com.example.learnify.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, OtpService otpService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
    }

    @Transactional // Add transactional annotation
    public User register(RegisterRequest request) {
        try {
            // Check for existing username
            if (userRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username already exists!");
            }
            // Check for existing email
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already exists!");
            }

            // Ensure rawPassword is not null or empty before hashing
            if (request.getPassword() == null || request.getPassword().isBlank()) {
                throw new IllegalArgumentException("Password cannot be empty.");
            }

            User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.CLIENT)
                .enabled(false)
                . build();

            otpService.generateAndSendOtp(user);

            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        
    }
}

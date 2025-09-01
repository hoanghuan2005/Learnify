package com.example.learnify.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.learnify.dtos.OtpVerifyRequest;
import com.example.learnify.entity.User;
import com.example.learnify.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class OtpService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRY_MINUTES = 5;

    public OtpService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    // Sinh OTP + lưu DB + gửi email
    @Transactional
    public void generateAndSendOtp(User user) {
        String otp = generateOtp();

        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));

        userRepository.save(user);

        // Gửi otp qua email
        String subject = "Learnify - Your OTP Code";
        String body = "Hello " + user.getUsername() + ",\n\n"
                + "Your OTP code is: " + otp + "\n"
                + "It will expire in " + OTP_EXPIRY_MINUTES + " minutes.\n\n"
                + "Thank you,\nLearnify Team";

        emailService.sendEmail(user.getEmail(), subject, body);
    }

    // Hàm sinh OTP random
    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < OTP_LENGTH; i++) {
            sb.append(random.nextInt(10)); // 0-9
        }
        return sb.toString();
    }

    // Hàm verify OTP - Register
    public boolean verifyOtp(OtpVerifyRequest otpVerifyRequest) {

        String otpCode = otpVerifyRequest.getOtpCode();

        User user = userRepository.findByEmail(otpVerifyRequest.getEmail()).orElse(null);
        if (user == null) return false;

        if (user.getOtpCode() == null || user.getOtpExpiry() == null) return false;

        boolean valid = user.getOtpCode().equals(otpCode)
            && user.getOtpExpiry().isAfter(LocalDateTime.now());

        if (valid) {
            user.setEnabled(true);  // enable account
            user.setOtpCode(null);  // tranh reuse otp
            user.setOtpExpiry(null);
            userRepository.save(user);
        }
        return valid;
    } 

    // verify otp - forgot password


    // verify otp - change password
}

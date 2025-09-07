    package com.example.learnify.controller;

    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    import com.example.learnify.dtos.LoginRequest;
    import com.example.learnify.dtos.OtpVerifyRequest;
    import com.example.learnify.dtos.RegisterRequest;
    import com.example.learnify.dtos.UserResponse;
    import com.example.learnify.entity.User;
    import com.example.learnify.security.JwtService;
    import com.example.learnify.service.AuthService;
    import com.example.learnify.service.OtpService;

    import lombok.RequiredArgsConstructor;

    import java.util.Map;

    import org.springframework.security.core.Authentication;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseCookie;
    import org.springframework.http.ResponseEntity;
    import org.springframework.http.HttpHeaders;
    import java.time.Duration;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestParam;



    @RestController
    @RequestMapping("/auth")
    @RequiredArgsConstructor

    public class AuthController {

        private final AuthService authService;
        private final OtpService otpService;
        private final JwtService jwtService;

        @PostMapping("/register")
        public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
            authService.register(request);
            // System.out.println(">>> Register called with: " + request);
            return ResponseEntity.ok("User registered. Please verify your email.");
        }

        @PostMapping("/verify-otp")
        public ResponseEntity<?> verifyOtp(@RequestBody OtpVerifyRequest otpVerifyRequest) {
            boolean success = otpService.verifyOtp(otpVerifyRequest);
            if (success) {
                return ResponseEntity.ok("OTP verified successfully. You can login now.");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP");
        }

        @PostMapping("/login")
            public ResponseEntity<?> login(@RequestBody LoginRequest request) {
                String token = authService.login(request);
                ResponseCookie cookie = ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(true)          // dev HTTP; production nên true + SameSite=None
            .sameSite("None")        // nếu chạy khác domain/HTTPS, dùng "None" + secure(true)
            .path("/")
            .maxAge(Duration.ofDays(7))
            .build();

        return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())  
        .body(Map.of("token", token, "message", "Login successful!"));

            }

        @PostMapping("/logout")
        public ResponseEntity<?> logout() {
            ResponseCookie delete = ResponseCookie.from("jwt", "")
                .httpOnly(true).secure(false).sameSite("Lax").path("/").maxAge(0).build();
            return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, delete.toString())
                .body("Logout successful!");
        }

        @GetMapping("/me")
        public ResponseEntity<?> getCurrentUser(Authentication authentication) {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }

            try {
                String email = authentication.getName();
                if (email == null || email.trim().isEmpty()) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid authentication");
                }
                
                User user = authService.getUserByEmail(email);
                
                // Convert to DTO to avoid lazy loading issues
                UserResponse userResponse = UserResponse.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .xp(user.getXp())
                    .level(user.getLevel())
                    .createdAt(user.getCreatedAt())
                    .enabled(user.isEnabled())
                    .build();

                return ResponseEntity.ok(userResponse);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        }
        
    }

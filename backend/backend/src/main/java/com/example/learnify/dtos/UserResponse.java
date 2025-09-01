package com.example.learnify.dtos;

import com.example.learnify.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private UserRole role;
    private int xp;
    private int level;
    private LocalDateTime createdAt;
    private boolean enabled;
}

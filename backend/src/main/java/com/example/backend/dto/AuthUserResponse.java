package com.example.backend.dto;

import com.example.backend.models.User;

public record AuthUserResponse(
        Long id,
        String username,
        String email,
        String role,
        String userType
) {
    public static AuthUserResponse from(User user) {
        return new AuthUserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getUserType()
        );
    }
}
package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.models.Role;
import com.example.backend.dto.UserDto;
import com.example.backend.services.UserService;
import com.example.backend.dto.LoginRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:8081")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Endpoint de Registro de Usuário (RF001).
     * Exemplo de uso: POST /api/v1/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto registrationData) {
        try {
            User newUser = userService.registerUser(
                    registrationData.getUsername(),
                    registrationData.getEmail(),
                    registrationData.getPassword(),
                    Role.ARTIST
            );
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint de Login de Usuário (RF001).
     * Exemplo de uso: POST /api/v1/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Ajustado para enviar getEmail() em vez de getUsername()
            User authenticatedUser = userService.authenticateUser(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
            
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "user", authenticatedUser
            ));

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
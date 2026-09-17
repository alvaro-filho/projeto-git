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
    public ResponseEntity<User> registerUser(@RequestBody UserDto registrationData) {
        try {
            User newUser = userService.registerUser(
                    registrationData.getUsername(),
                    registrationData.getEmail(),
                    registrationData.getPassword(),
                    Role.ARTIST // Definindo Role fixo ou passável
            );
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Captura exceções de negócio (usuário já existe, etc.)
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint de Login de Usuário (RF001).
     * Exemplo de uso: POST /api/v1/auth/login
     * O retorno deve conter o token JWT (a ser adicionado posteriormente) e o usuário.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User authenticatedUser = userService.authenticateUser(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            );
            
            // TODO: Implementar a geração e retorno do JWT Token aqui.
            // Por enquanto, retornamos apenas o usuário autenticado.
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "user", authenticatedUser
                    // Aqui viria o JWT Token
            ));

        } catch (RuntimeException e) {
            // Captura exceções de negócio (credenciais inválidas)
            return new ResponseEntity(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}

// --- DTOs de Exemplo (Devem ser criados em um pacote dto) ---
// class UserDto {
//     private String username;
//     private String email;
//     private String password;
//     // Getters/Setters
// }

// class LoginRequest {
//     private String username;
//     private String password;
//     // Getters/Setters
// }
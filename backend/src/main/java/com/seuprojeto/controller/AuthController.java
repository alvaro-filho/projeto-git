package com.seuprojeto.controller;

import com.seuprojeto.dto.LoginRequest;
import com.seuprojeto.dto.RegisterRequest;
import com.seuprojeto.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint para registro de novos usuários.
     * POST /api/v1/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterRequest request) {
        // O AuthService já trata a lógica de validação e persistência
        String token = authService.register(request);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

    /**
     * Endpoint para login e obtenção de token.
     * POST /api/v1/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginRequest request) {
        // O AuthService já trata a lógica de autenticação e geração de token
        String token = authService.login(request);
        return ResponseEntity.ok(token);
    }
}
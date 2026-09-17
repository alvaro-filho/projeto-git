package com.seuprojeto.service;

import com.seuprojeto.dto.LoginRequest;
import com.seuprojeto.dto.RegisterRequest;
import com.seuprojeto.model.Role;
import com.seuprojeto.model.User;
import com.seuprojeto.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * Registra um novo usuário no sistema.
     * @return O JWT token gerado para o novo usuário.
     */
    @Transactional
    public String register(RegisterRequest request) {
        // 1. Validação de E-mail
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado. O usuário já existe.");
        }

        // 2. Hash da Senha
        String encodedPassword = passwordEncoder.encode(request.getSenha());

        // 3. Criação da Entidade
        User newUser = User.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(encodedPassword)
                // Usa o role fornecido no DTO ou define um default.
                .role(Role.valueOf(request.getRole().toUpperCase())) 
                .build();

        // 4. Persistência
        User savedUser = userRepository.save(newUser);

        // 5. Geração do Token
        return jwtService.generateToken(savedUser);
    }

    /**
     * Autentica um usuário e retorna o JWT token.
     * @return O JWT token.
     */
    public String login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Email ou senha inválidos.");
        }

        User user = userOptional.get();

        // Verifica a senha
        if (!passwordEncoder.matches(request.getSenha(), user.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos.");
        }

        // Gera o token
        return jwtService.generateToken(user);
    }
}
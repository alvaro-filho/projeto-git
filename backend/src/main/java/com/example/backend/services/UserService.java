package com.example.backend.services;

import com.example.backend.models.Role; // Importando Role
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registra um novo usuário no sistema.
     * @param username Nome de usuário desejado.
     * @param email Email do usuário.
     * @param password Senha em texto simples.
     * @param role Função do usuário.
     * @return O usuário criado.
     * @throws RuntimeException se o username ou email já existirem.
     */
    public User registerUser(String username, String email, String password, Role role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username já está em uso.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email já está em uso.");
        }

        // 1. Hash da senha
        String hashedPassword = passwordEncoder.encode(password);

        // 2. Criação da entidade
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPasswordHash(hashedPassword);
        newUser.setRole(role);
        newUser.setUserType("ARTIST"); // Placeholder de ajuste, assumindo que o tipo padrão é ARTIST.

        // 3. Persistência
        return userRepository.save(newUser);
    }

    /**
     * Autentica um usuário e retorna o objeto User (sem a senha) e o JWT token.
     * @param username Nome de usuário.
     * @param password Senha fornecida.
     * @return O objeto User autenticado.
     * @throws RuntimeException se as credenciais forem inválidas.
     */
    public User authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Credenciais inválidas.");
        }

        User user = userOptional.get();

        // 1. Verificação do Hash
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Credenciais inválidas.");
        }

        // Se o hash bater, o usuário está autenticado.
        return user;
    }
}
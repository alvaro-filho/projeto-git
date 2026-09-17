package com.example.backend.repositories;

import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Método para encontrar um usuário pelo nome de usuário.
     * JPA irá gerar a implementação do findByUsername.
     */
    Optional<User> findByUsername(String username);

    /**
     * Método para encontrar um usuário pelo e-mail.
     * JPA irá gerar a implementação do findByEmail.
     */
    Optional<User> findByEmail(String email);
}
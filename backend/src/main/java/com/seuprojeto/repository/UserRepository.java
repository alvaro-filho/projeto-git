package com.seuprojeto.repository;

import com.seuprojeto.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Busca um usuário pelo e-mail.
     * @param email O e-mail do usuário.
     * @return Optional contendo o usuário se encontrado.
     */
    Optional<User> findByEmail(String email);
}
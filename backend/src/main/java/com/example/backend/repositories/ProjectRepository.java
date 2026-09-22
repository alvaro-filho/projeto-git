package com.example.backend.repositories;

import com.example.backend.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repositório para a entidade Project (RF005).
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    /**
     * Encontra projetos criados por um usuário específico.
     * @param createdByUser O usuário que criou o projeto.
     * @return Lista de projetos.
     */
    List<Project> findByCreatedByUser(com.example.backend.models.User createdByUser);

    /**
     * Encontra um projeto pelo seu slug (URL amigável).
     * @param slug O slug do projeto.
     * @return Optional do projeto encontrado.
     */
    Optional<Project> findBySlug(String slug);
}
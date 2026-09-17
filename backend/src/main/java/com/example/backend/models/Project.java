package com.example.backend.models;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug; // Usado para URLs amigáveis

    @Column(columnDefinition = "TEXT")
    private String description;

    // Relacionamento opcional com o Criador do Projeto (usuário)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdByUser;

    // Adicionar mais campos conforme necessário (ex: status, ownerId)

    public Project() {
        // Construtor padrão JPA
    }

    // Getters e Setters (Devem ser implementados ou usados Lombok)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(User createdByUser) {
        this.createdByUser = createdByUser;
    }

    // Implementar equals() e hashCode() baseado nos campos de identidade.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
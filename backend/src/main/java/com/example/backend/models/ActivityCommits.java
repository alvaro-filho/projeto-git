package com.example.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_commits")
public class ActivityCommits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId; // Chave estrangeira para o usuário que realizou a atividade

    @Column(nullable = false)
    private LocalDateTime timestamp; // O momento exato do commit

    // Você pode adicionar um campo 'activityType' (e.g., CODE_COMMIT, DRAFT_SAVE) se necessário
    // private String activityType;

    // Construtores
    public ActivityCommits() {}

    public ActivityCommits(Long userId, LocalDateTime timestamp) {
        this.userId = userId;
        this.timestamp = timestamp;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
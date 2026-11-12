package com.example.backend.dto;

import com.example.backend.models.EventType;
import jakarta.validation.constraints.NotNull;

public record ActivityEventRequest(
        @NotNull(message = "O tipo do evento é obrigatório.") EventType type,
        Long projectId
) {
}
package com.example.backend.dto;

import java.time.LocalDate;

public record HeatmapDTO(LocalDate date, long count) {
}
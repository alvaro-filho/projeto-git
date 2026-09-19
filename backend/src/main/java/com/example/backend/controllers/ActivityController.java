package com.example.backend.controllers;

import com.example.backend.services.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/activity")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    /**
     * Endpoint para gerar o mapa de calor de atividades de um usuário específico (RF002).
     * Exemplo de uso: GET /api/v1/activity/heatmap?userId={id}&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
     */
    @GetMapping("/heatmap")
    public ResponseEntity<Map<String, Integer>> getActivityHeatmap(
            @RequestParam Long userId,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate endDate) {
        
        if (startDate == null) startDate = java.time.LocalDate.now().minusYears(1);
        if (endDate == null) endDate = java.time.LocalDate.now();
        
        Map<String, Integer> heatmap = activityService.getActivityHeatmap(userId, startDate, endDate);
        return ResponseEntity.ok(heatmap);
    }
}
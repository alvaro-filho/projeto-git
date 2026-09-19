package com.example.backend.controllers;

import com.example.backend.dto.ActivityEventRequest;
import com.example.backend.dto.HeatmapDTO;
import com.example.backend.dto.DeliveryTrendDTO;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.ActivityEventService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/activity")
public class ActivityController {

    private final ActivityEventService activityEventService;
    private final UserRepository userRepository;

    public ActivityController(
            ActivityEventService activityEventService,
            UserRepository userRepository
    ) {
        this.activityEventService = activityEventService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> logActivity(
            @Valid @RequestBody ActivityEventRequest request,
            Authentication authentication
    ) {
        User user = findAuthenticatedUser(authentication);
        activityEventService.logEvent(user, request.type(), request.projectId());
        return ResponseEntity.status(201).body(Map.of("message", "Atividade registrada."));
    }

    @GetMapping("/heatmap")
    public ResponseEntity<List<HeatmapDTO>> getHeatmap(Authentication authentication) {
        User user = findAuthenticatedUser(authentication);
        return ResponseEntity.ok(activityEventService.getHeatmap(user.getId()));
    }

    @GetMapping("/delivery-trend")
    public ResponseEntity<List<DeliveryTrendDTO>> getDeliveryTrend(Authentication authentication) {
        User user = findAuthenticatedUser(authentication);
        return ResponseEntity.ok(activityEventService.getDeliveryTrend(user.getId()));
    }

    private User findAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Usuário autenticado não encontrado."));
    }
}
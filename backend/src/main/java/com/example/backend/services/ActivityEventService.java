package com.example.backend.services;

import com.example.backend.dto.HeatmapDTO;
import com.example.backend.models.ActivityEvent;
import com.example.backend.models.EventType;
import com.example.backend.models.User;
import com.example.backend.models.Project;
import com.example.backend.repositories.ProjectRepository;
import com.example.backend.repositories.ActivityEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.backend.dto.DeliveryTrendDTO;

@Service
public class ActivityEventService {

    private final ActivityEventRepository activityEventRepository;
    private final ProjectRepository projectRepository;

    public ActivityEventService(ActivityEventRepository activityEventRepository, ProjectRepository projectRepository) {
        this.activityEventRepository = activityEventRepository;
        this.projectRepository = projectRepository;
    }

    public ActivityEvent logEvent(User user, EventType type) {
        return logEvent(user, type, null);
    }

    public ActivityEvent logEvent(User user, EventType type, Long projectId) {
        ActivityEvent event = new ActivityEvent();
        event.setUser(user);
        event.setType(type);
        event.setTimestamp(LocalDateTime.now());
        if (projectId != null) {
            Project project = projectRepository.findById(projectId)
                    .filter(candidate -> candidate.getCreatedByUser().getId().equals(user.getId()))
                    .orElseThrow(() -> new IllegalArgumentException("Projeto não pertence ao usuário autenticado."));
            event.setProject(project);
        }
        return activityEventRepository.save(event);
    }

    public List<HeatmapDTO> getHeatmap(Long userId) {
        return activityEventRepository.getActivityHeatmap(userId).stream()
            .map(row -> new HeatmapDTO(
                LocalDate.parse(row[0].toString()),
                ((Number) row[1]).longValue()
            ))
            .toList();
    }

        public List<DeliveryTrendDTO> getDeliveryTrend(Long userId) {
        YearMonth currentMonth = YearMonth.now();
        LocalDate startDate = currentMonth.minusMonths(5).atDay(1);
        LocalDate endDate = currentMonth.atEndOfMonth();
        Map<YearMonth, Map<EventType, Long>> eventsByMonth = activityEventRepository
            .findByUserIdAndTimestampBetween(userId, startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay())
            .stream()
            .collect(Collectors.groupingBy(
                event -> YearMonth.from(event.getTimestamp()),
                Collectors.groupingBy(ActivityEvent::getType, Collectors.counting())
            ));

        return java.util.stream.Stream.iterate(currentMonth.minusMonths(5), month -> month.plusMonths(1))
            .limit(6)
            .map(month -> new DeliveryTrendDTO(
                month.getMonth().getDisplayName(TextStyle.SHORT, Locale.forLanguageTag("pt-BR"))
                    .replace(".", ""),
                eventsByMonth.getOrDefault(month, Map.of()).getOrDefault(EventType.TASK_COMPLETED, 0L),
                eventsByMonth.getOrDefault(month, Map.of()).getOrDefault(EventType.TASK_REVIEWED, 0L)
            ))
            .toList();
        }
}
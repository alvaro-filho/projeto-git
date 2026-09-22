package com.example.backend.services;

import com.example.backend.models.ActivityCommits;
import com.example.backend.repositories.ActivityRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Serviço responsável pela lógica de negócio de atividades do usuário (RF002).
 */
@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    /**
     * Recupera os dados agregados para o mapa de calor de atividade.
     * @param userId O ID do usuário cujas atividades serão mapeadas.
     * @param startData A data de início do período (inclusive).
     * @param endData A data de fim do período (inclusive).
     * @return Um mapa onde a chave é a data (formato YYYY-MM-DD) e o valor é a contagem de commits.
     */
    public Map<String, Integer> getActivityHeatmap(Long userId, LocalDate startData, LocalDate endData) {
        // 1. Busca todos os commits para o usuário no período, de forma otimizada pelo JPA.
        List<ActivityCommits> commits = activityRepository.findByUserIdAndTimestampBetween(userId, startData, endData);

        // 2. Agregação: Contar commits por dia.
        return commits.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        commit -> commit.getTimestamp().toLocalDate().toString(), // Usa a data do timestamp do commit
                        java.util.stream.Collectors.counting()
                ))
                .entrySet().stream()
                .collect(java.util.stream.Collectors.toMap(
                        java.util.Map.Entry::getKey,
                        e -> e.getValue().intValue()
                ));
    }
}
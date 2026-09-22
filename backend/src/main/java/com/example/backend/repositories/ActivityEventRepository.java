package com.example.backend.repositories;

import com.example.backend.models.ActivityEvent;
import com.example.backend.dto.HeatmapDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.time.LocalDate;

public interface ActivityEventRepository extends JpaRepository<ActivityEvent, Long> {

    List<ActivityEvent> findByUserIdAndTimestampBetween(Long userId, java.time.LocalDateTime startDate,
                                                         java.time.LocalDateTime endDate);

        @Query("SELECT function('date', a.timestamp), COUNT(a) "
            + "FROM ActivityEvent a WHERE a.user.id = :userId GROUP BY function('date', a.timestamp) "
            + "ORDER BY function('date', a.timestamp)")
        List<Object[]> getActivityHeatmap(@Param("userId") Long userId);
}
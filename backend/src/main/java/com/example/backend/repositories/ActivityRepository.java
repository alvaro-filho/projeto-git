package com.example.backend.repositories;

import com.example.backend.models.ActivityCommits;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repositório para a entidade ActivityCommits (RF002).
 */
public interface ActivityRepository extends JpaRepository<ActivityCommits, Long> {

    /**
     * Encontra todos os commits de atividade para um dado usuário.
     * @param userId O ID do usuário.
     * @return Lista de commits.
     */

    /**
     * Busca todos os commits de atividade para um dado usuário dentro de um intervalo de tempo.
     * @param userId O ID do usuário.
     * @param startData A data de início do período (inclusive).
     * @param endData A data de fim do período (inclusive).
     * @return Lista de commits dentro do período.
     */
    List<ActivityCommits> findByUserIdAndTimestampBetween(Long userId, java.time.LocalDate startData, java.time.LocalDate endData);

    /**
     * Conta quantos commits existem para um dado usuário em um determinado intervalo de tempo.
     * Nota: JPA pode não suportar o método abaixo diretamente, mas é o ideal para o heatmap.
     * Por simplicidade inicial, vamos usar o findByUserId e fazer a filtragem na Service.
     * Se for necessário, um método de consulta nativa será adicionado aqui.
     */
    // Por enquanto, apenas o findByUserId deve ser suficiente, pois a lógica de agregação do heatmap
    // será tratada na camada de serviço para melhor abstração.
}
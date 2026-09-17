package com.example.backend.services;

import com.example.backend.models.Project;
import com.example.backend.models.User;
import com.example.backend.repositories.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Serviço de negócio para gerenciamento de projetos (RF005).
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    // Poderíamos injetar o UserRepository aqui para associar o criador do projeto.
    // private final UserRepository userRepository; 

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /**
     * Lista todos os projetos existentes no sistema.
     * Este método será o ponto de entrada principal para o Dashboard.
     * @return Uma lista de todos os projetos.
     */
    @Transactional(readOnly = true)
    public List<Project> findAllProjects() {
        // Retorna todos os projetos, ou uma lista vazia se não houver nenhum.
        return projectRepository.findAll();
    }

    /**
     * Busca um projeto específico pelo seu ID.
     * @param projectId O ID do projeto.
     * @return Um Optional contendo o projeto, se existir.
     */
    @Transactional(readOnly = true)
    public Optional<Project> findProjectById(Long projectId) {
        return projectRepository.findById(projectId);
    }

    /**
     * Cria um novo projeto no sistema.
     * @param project Os dados do projeto a ser criado.
     * @param creator O usuário que está criando o projeto.
     * @return O projeto salvo com seu ID gerado.
     */
    @Transactional
    public Project createProject(Project project, User creator) {
        // Configura o usuário criador antes de salvar
        project.setCreatedByUser(creator);
        // É crucial garantir que o slug seja único ou gerado corretamente.
        // Aqui assumimos que o serviço de criação de slug é tratado ou que o input é limpo.
        
        return projectRepository.save(project);
    }
}
package com.example.backend.controllers;

import com.example.backend.models.Project;
import com.example.backend.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gerenciar endpoints relacionados a projetos (RF005).
 */
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Endpoint para listar todos os projetos existentes no sistema.
     * GET /api/v1/projects
     * @return ResponseEntity contendo a lista de projetos.
     */
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.findAllProjects();
        return ResponseEntity.ok(projects);
    }

    /**
     * Endpoint para buscar um projeto por seu ID.
     * GET /api/v1/projects/{projectId}
     * @param projectId O ID do projeto a ser buscado.
     * @return ResponseEntity com o projeto ou 404 Not Found.
     */
    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long projectId) {
        Optional<Project> project = projectService.findProjectById(projectId);
        return project.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Endpoint para criar um novo projeto. (Assumindo que o usuário autenticado é o criador).
     * POST /api/v1/projects
     * @param projectDetails Os detalhes do projeto.
     * @param currentUser O usuário que está realizando a criação.
     * @return ResponseEntity com o projeto criado.
     */
    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody Project projectDetails,
            @RequestHeader("X-User-Id") Long currentUser) {
        
        // Implementação de segurança deve garantir que o 'currentUser' seja o usuário autenticado
        // Em um ambiente real, usaríamos SecurityContextHolder.
        // Por enquanto, usamos o header simulado para fins de teste.
        Project newProject = projectService.createProject(projectDetails, new com.example.backend.models.User(/* dummy user */)); 
        
        // Nota: O dummy user precisa ser ajustado para funcionar com o contexto de segurança real.
        // Por enquanto, o serviço deve ser ajustado para aceitar um User ou ID.
        
        return ResponseEntity.status(201).body(newProject);
    }
}
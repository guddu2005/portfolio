package com.portfolio.api.controller;

import com.portfolio.api.dto.MessageResponse;
import com.portfolio.api.entity.Project;
import com.portfolio.api.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) String category) {
        
        if (Boolean.TRUE.equals(featured)) {
            return ResponseEntity.ok(projectRepository.findByFeaturedTrue());
        }
        if (category != null && !category.trim().isEmpty() && !"all".equalsIgnoreCase(category)) {
            return ResponseEntity.ok(projectRepository.findByCategoryIgnoreCase(category));
        }
        return ResponseEntity.ok(projectRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        if (project.getTitle() == null || project.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Title is required"));
        }
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        return projectRepository.findById(id).map(existingProject -> {
            existingProject.setTitle(projectDetails.getTitle());
            existingProject.setDescription(projectDetails.getDescription());
            existingProject.setLongDescription(projectDetails.getLongDescription());
            existingProject.setCategory(projectDetails.getCategory());
            existingProject.setImageUrl(projectDetails.getImageUrl());
            existingProject.setTags(projectDetails.getTags());
            existingProject.setLiveUrl(projectDetails.getLiveUrl());
            existingProject.setGithubUrl(projectDetails.getGithubUrl());
            existingProject.setFeatured(projectDetails.isFeatured());

            Project updatedProject = projectRepository.save(existingProject);
            return ResponseEntity.ok(updatedProject);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return projectRepository.findById(id).map(project -> {
            projectRepository.delete(project);
            return ResponseEntity.ok(new MessageResponse("Project deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

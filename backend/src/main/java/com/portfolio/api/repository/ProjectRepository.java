package com.portfolio.api.repository;

import com.portfolio.api.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByFeaturedTrue();
    List<Project> findByCategoryIgnoreCase(String category);
    List<Project> findAllByOrderByCreatedAtDesc();
}

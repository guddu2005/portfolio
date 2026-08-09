package com.portfolio.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Issuer is required")
    private String issuer;

    private String issueDate;

    @Column(length = 2000)
    private String description;

    private String badge;

    private String imageUrl;

    private String publicId;

    private LocalDateTime createdAt;

    public Certificate() {
        this.createdAt = LocalDateTime.now();
    }

    public Certificate(String title, String issuer, String issueDate, String description, String badge, String imageUrl, String publicId) {
        this();
        this.title = title;
        this.issuer = issuer;
        this.issueDate = issueDate;
        this.description = description;
        this.badge = badge;
        this.imageUrl = imageUrl;
        this.publicId = publicId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }

    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

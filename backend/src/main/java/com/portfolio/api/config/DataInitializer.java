package com.portfolio.api.config;

import com.portfolio.api.entity.Certificate;
import com.portfolio.api.entity.ContactMessage;
import com.portfolio.api.entity.Project;
import com.portfolio.api.entity.User;
import com.portfolio.api.repository.CertificateRepository;
import com.portfolio.api.repository.ContactRepository;
import com.portfolio.api.repository.ProjectRepository;
import com.portfolio.api.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ContactRepository contactRepository;
    private final CertificateRepository certificateRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           ProjectRepository projectRepository,
                           ContactRepository contactRepository,
                           CertificateRepository certificateRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.contactRepository = contactRepository;
        this.certificateRepository = certificateRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed Admin user for Guddu Kumar
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", passwordEncoder.encode("admin123"), "ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println(">>> Initialized default admin account for Guddu Kumar (username: admin / password: admin123)");
        }

        // Clear existing and seed in exact requested sequence: Java Projects FIRST, followed by DineTime, CartNest, LumiVize, MentorConnect
        projectRepository.deleteAll();

        // =========================================================================
        // SECTION 1: ALL JAVA & SPRING BOOT PROJECTS (PLACED FIRST)
        // =========================================================================

        // 1. LeadFlow-CRM (Java 21 Spring Boot 3 - Latest Project)
        Project p1 = new Project();
        p1.setTitle("LeadFlow-CRM");
        p1.setDescription("Enterprise Lead Management CRM built with Java 21, Spring Boot 3, Spring Security 6 JWT, PostgreSQL, and Redis.");
        p1.setLongDescription("Scalable lead management & pipeline tracking CRM system built with Java 21 and Spring Boot 3. Features role-based access control (RBAC), JWT authentication, PostgreSQL lead tracking, automated email notifications, and Redis caching.");
        p1.setCategory("Backend");
        p1.setImageUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop");
        p1.setTags("Java 21, Spring Boot 3, Spring Security 6, JWT, PostgreSQL, Redis, Docker, REST APIs");
        p1.setLiveUrl("https://leadflow-crm.example.com");
        p1.setGithubUrl("https://github.com/guddu2005/leadflow-crm");
        p1.setFeatured(true);
        projectRepository.save(p1);

        // 2. Enterprise Job Portal System (Java 21 Spring Boot 3)
        Project p2 = new Project();
        p2.setTitle("Enterprise Job Portal System");
        p2.setDescription("Distributed recruitment platform built with Java 21, Spring Boot 3, MongoDB, Redis, Docker, and Gemini API.");
        p2.setLongDescription("Scalable job portal featuring Gemini API AI resume parsing, candidate skill-gap analysis, RBAC security, Redis caching, and automated email notifications.");
        p2.setCategory("Full Stack");
        p2.setImageUrl("https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop");
        p2.setTags("Java 21, Spring Boot 3, Spring Security, JWT, MongoDB, Redis, Docker, Gemini API");
        p2.setLiveUrl("https://jobportal-demo.example.com");
        p2.setGithubUrl("https://github.com/guddu2005/enterprise-job-portal");
        p2.setFeatured(true);
        projectRepository.save(p2);

        // 3. Microservices Journal Management Platform (Java 21 Spring Boot 3)
        Project p3 = new Project();
        p3.setTitle("Microservices Journal Platform");
        p3.setDescription("Distributed microservices platform built using Java 21, Spring Boot 3, Gemini API, Redis, and MongoDB.");
        p3.setLongDescription("Scalable journal publication & sentiment analysis platform using Gemini AI, distributed microservices, Spring Security RBAC, and automated email notification workflows.");
        p3.setCategory("Backend");
        p3.setImageUrl("https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop");
        p3.setTags("Java 21, Spring Boot 3, Microservices, Gemini API, Redis, MongoDB, JWT");
        p3.setLiveUrl("https://journal-platform.example.com");
        p3.setGithubUrl("https://github.com/guddu2005/microservices-journal-platform");
        p3.setFeatured(true);
        projectRepository.save(p3);

        // 4. Chat-Sphere (Java Spring Boot WebSockets & React)
        Project p4 = new Project();
        p4.setTitle("Chat-Sphere");
        p4.setDescription("Real-time messaging platform using WebSockets, STOMP protocol, SockJS, Spring Boot, and React.js.");
        p4.setLongDescription("High-concurrency chat application featuring instant message streaming, active online presence, room management, and secure token validation built with Spring Boot and React.");
        p4.setCategory("Full Stack");
        p4.setImageUrl("https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&auto=format&fit=crop");
        p4.setTags("Java 21, Spring Boot, WebSockets, STOMP, SockJS, React.js, JWT, MongoDB");
        p4.setLiveUrl("https://chatsphere-demo.example.com");
        p4.setGithubUrl("https://github.com/guddu2005/chatsphere");
        p4.setFeatured(true);
        projectRepository.save(p4);

        // =========================================================================
        // SECTION 2: OTHER PROJECTS (DineTime, CartNest, LumiVize, MentorConnect)
        // =========================================================================

        // 5. DineTime (React Native & Firebase)
        Project p5 = new Project();
        p5.setTitle("DineTime");
        p5.setDescription("Cross-platform mobile dining management system built using React Native, Firebase Auth, and Firestore.");
        p5.setLongDescription("Mobile app simplifying restaurant dining booking and meal schedule management with Firebase Authentication, real-time Firestore database, and responsive mobile interfaces.");
        p5.setCategory("Frontend");
        p5.setImageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop");
        p5.setTags("React Native, Firebase Auth, Firestore, Mobile App, Tailwind CSS");
        p5.setLiveUrl("https://dinetime.example.com");
        p5.setGithubUrl("https://github.com/guddu2005/dinetime");
        p5.setFeatured(false);
        projectRepository.save(p5);

        // 6. CartNest (MERN Stack E-Commerce)
        Project p6 = new Project();
        p6.setTitle("CartNest");
        p6.setDescription("Full-stack e-commerce platform built with React.js, Node.js, Express.js, MongoDB, and Context API.");
        p6.setLongDescription("Seamless shopping experience featuring product browsing, personalized cart management, RESTful APIs, JWT authentication, and Context API state management.");
        p6.setCategory("Full Stack");
        p6.setImageUrl("https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop");
        p6.setTags("MERN Stack, React.js, Node.js, Express.js, MongoDB, Tailwind CSS");
        p6.setLiveUrl("https://cartnest.example.com");
        p6.setGithubUrl("https://github.com/guddu2005/cartnest");
        p6.setFeatured(false);
        projectRepository.save(p6);

        // 7. LumiVize (ERP Project of Hackathon)
        Project p7 = new Project();
        p7.setTitle("LumiVize — ERP & Analytics");
        p7.setDescription("AI-assisted Enterprise Resource Planning (ERP) & analytics dashboard developed for Hackathon.");
        p7.setLongDescription("Comprehensive ERP dashboard streamlining inventory tracking, financial analytics, automated reporting, and AI-driven business insights for enterprise operations.");
        p7.setCategory("Full Stack");
        p7.setImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop");
        p7.setTags("React.js, Spring Boot, PostgreSQL, Tailwind CSS, AI Analytics");
        p7.setLiveUrl("https://lumivize-erp.example.com");
        p7.setGithubUrl("https://github.com/guddu2005/lumivize-erp");
        p7.setFeatured(false);
        projectRepository.save(p7);

        // 8. MentorConnect (MERN Stack - Hackathon Award Winner)
        Project p8 = new Project();
        p8.setTitle("MentorConnect");
        p8.setDescription("MERN Stack mentorship platform (Shivatech Hackathon 2024 Award Winner!).");
        p8.setLongDescription("3D mentorship platform connecting engineering students with industry experts for live code reviews, session scheduling, and automated JWT authentication.");
        p8.setCategory("Full Stack");
        p8.setImageUrl("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop");
        p8.setTags("MERN Stack, React.js, Node.js, Express.js, MongoDB, JWT");
        p8.setLiveUrl("https://mentorconnect.example.com");
        p8.setGithubUrl("https://github.com/guddu2005/mentor-connect");
        p8.setFeatured(true);
        projectRepository.save(p8);

        System.out.println(">>> Seeded Guddu Kumar's project portfolio: Java projects FIRST, followed by DineTime, CartNest, LumiVize, MentorConnect.");

        // Seed Sample Contact Message if empty
        if (contactRepository.count() == 0) {
            ContactMessage msg = new ContactMessage(
                "Explorin Recruiter",
                "reachguddu.dev@gmail.com",
                "Software Engineering Opportunities",
                "Hi Guddu! We were thoroughly impressed by your performance during your Explorin MERN Internship, your 1st & 2nd Year Rank 1 record at Shivalik College of Engineering Dehradun, and your LeadFlow-CRM & Job Portal projects."
            );
            contactRepository.save(msg);
            System.out.println(">>> Seeded sample contact message for Guddu Kumar.");
        }

        // Seed Sample Certificates if empty
        if (certificateRepository.count() == 0) {
            Certificate c1 = new Certificate(
                "Certificate of Academic Excellence (Rank 1)",
                "Shivalik College, Dehradun",
                "Academic Year 2023-24",
                "Awarded First Position in B.Tech Computer Science & Engineering department for securing 1st Rank with Gold Medal honor at SHIVAFEST 2025.",
                "1st Rank • Gold Medalist",
                "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop",
                "sample_public_id_1"
            );
            certificateRepository.save(c1);

            System.out.println(">>> Seeded sample certificates in H2 database.");
        }
    }
}

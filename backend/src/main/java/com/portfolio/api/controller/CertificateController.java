package com.portfolio.api.controller;

import com.portfolio.api.entity.Certificate;
import com.portfolio.api.repository.CertificateRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateRepository certificateRepository;

    public CertificateController(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {
        return ResponseEntity.ok(certificateRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Certificate> createCertificate(@Valid @RequestBody Certificate certificate) {
        Certificate saved = certificateRepository.save(certificate);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertificate(@PathVariable Long id) {
        return certificateRepository.findById(id).map(cert -> {
            certificateRepository.delete(cert);
            return ResponseEntity.ok(Map.of("message", "Certificate deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

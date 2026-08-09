package com.portfolio.api.controller;

import com.portfolio.api.dto.MessageResponse;
import com.portfolio.api.entity.ContactMessage;
import com.portfolio.api.repository.ContactRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage message) {
        if (message.getName() == null || message.getName().trim().isEmpty() ||
            message.getEmail() == null || message.getEmail().trim().isEmpty() ||
            message.getMessage() == null || message.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Name, Email, and Message are required."));
        }

        ContactMessage savedMessage = contactRepository.save(message);
        return ResponseEntity.ok(new MessageResponse("Thank you! Your message has been sent successfully."));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactRepository.findAllByOrderByCreatedAtDesc());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        return contactRepository.findById(id).map(msg -> {
            contactRepository.delete(msg);
            return ResponseEntity.ok(new MessageResponse("Message deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

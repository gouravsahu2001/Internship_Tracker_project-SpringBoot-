package com.example.internshipportal.controller;

import com.example.internshipportal.dto.ApplicationRequest;
import com.example.internshipportal.dto.ApplicationResponse;
import com.example.internshipportal.model.Application;
import com.example.internshipportal.services.ApplicationService;
import com.example.internshipportal.repository.StudentRepository;
import com.example.internshipportal.model.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private StudentRepository studentRepository;

    // Student applies for internship
    @PostMapping
    public ResponseEntity<Application> applyForInternship(@RequestBody ApplicationRequest request) {
        Application savedApplication = applicationService.apply(request);
        return ResponseEntity.ok(savedApplication);
    }

    // ✅ Admin sees all, Student sees only their own
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<ApplicationResponse>> getApplications(Authentication authentication) {
        String email = authentication.getName(); // email from JWT

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return ResponseEntity.ok(applicationService.getAllApplications());
        } else {
            Student student = studentRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            return ResponseEntity.ok(applicationService.getApplicationsByStudentId(student.getId()));
        }
    }
}

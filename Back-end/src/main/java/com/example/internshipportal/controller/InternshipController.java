package com.example.internshipportal.controller;

import com.example.internshipportal.model.Internship;
import com.example.internshipportal.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    private InternshipRepository internshipRepository;

    // 🟢 Public Access – Sab dekh sakte hain
    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    // 🟡 Admin Only – Create Internship
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Internship createInternship(@RequestBody Internship internship) {
        return internshipRepository.save(internship);
    }

    // 🟢 Public Access – Get by ID
    @GetMapping("/{id}")
    public Internship getInternshipById(@PathVariable Long id) {
        return internshipRepository.findById(id).orElse(null);
    }

    // 🟡 Admin Only – Update Internship
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Internship updateInternship(@PathVariable Long id, @RequestBody Internship internship) {
        internship.setId(id);
        return internshipRepository.save(internship);
    }

    // 🟡 Admin Only – Delete Internship
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteInternship(@PathVariable Long id) {
        internshipRepository.deleteById(id);
    }
}
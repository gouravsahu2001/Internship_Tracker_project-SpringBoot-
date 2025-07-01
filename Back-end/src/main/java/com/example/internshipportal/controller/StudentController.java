package com.example.internshipportal.controller;

import com.example.internshipportal.model.Student;
import com.example.internshipportal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setName(updatedStudent.getName());
                    student.setEmail(updatedStudent.getEmail());
                    student.setActive(updatedStudent.isActive());
                    return ResponseEntity.ok(studentRepository.save(student));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        studentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

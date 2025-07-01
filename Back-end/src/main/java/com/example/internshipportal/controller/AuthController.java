package com.example.internshipportal.controller;

import com.example.internshipportal.dto.AuthRequest;
import com.example.internshipportal.dto.RegisterRequest;
import com.example.internshipportal.model.Admin;
import com.example.internshipportal.model.Student;
import com.example.internshipportal.repository.AdminRepository;
import com.example.internshipportal.repository.StudentRepository;
import com.example.internshipportal.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    // 🟢 Student Registration
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest request) {
        if (studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setPhone(request.getPhone());
        student.setCourse(request.getDegree());
        student.setBranch(request.getBranch());
        student.setYear(request.getYear());
        student.setRollNumber(request.getRollNumber());
        student.setCollege(request.getCollege());
        studentRepository.save(student);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Student registered successfully");
        return ResponseEntity.ok(response);
    }

    // 🟡 Admin Registration
    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) {
        // Wrap the result in Optional to handle null cases
        Optional<Admin> optionalAdmin = Optional.ofNullable(adminRepository.findByEmail(request.getEmail()));

        if (optionalAdmin.isPresent()) {
            throw new RuntimeException("Admin email already exists");
        }

        Admin admin = new Admin();
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setPhone(request.getPhone());
        admin.setRole("ADMIN");

        adminRepository.save(admin);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Admin registered successfully");
        return ResponseEntity.ok(response);
    }

    // 🟢 Student Login
    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody AuthRequest request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(student.getEmail(), student.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", "STUDENT");
        response.put("email", student.getEmail());
        response.put("name", student.getName());
        return ResponseEntity.ok(response);
    }
    // 🟡 Admin Login
    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AuthRequest request) {
        // Wrap the result in Optional to handle null cases
        Optional<Admin> optionalAdmin = Optional.ofNullable(adminRepository.findByEmail(request.getEmail()));

        Admin admin = optionalAdmin.orElseThrow(() -> new RuntimeException("Invalid admin credentials"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid admin credentials");
        }

        String token = jwtUtils.generateToken(admin.getEmail(),admin.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", "ADMIN");
        response.put("email", admin.getEmail());
        response.put("name", admin.getName());
        return ResponseEntity.ok(response);
    }
}
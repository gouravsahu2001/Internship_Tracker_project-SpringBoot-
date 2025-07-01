package com.example.internshipportal.services;

import com.example.internshipportal.dto.AuthRequest;
import com.example.internshipportal.dto.RegisterRequest;
import com.example.internshipportal.model.Student;
import com.example.internshipportal.repository.StudentRepository;
import com.example.internshipportal.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Registers a new student.
     */
    public Map<String, Object> register(RegisterRequest request) {
        // Check if email is already taken
        if (studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered.");
        }

        // Create new student object
        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setPhone(request.getPhone());
        student.setCollege(request.getCollege());
        student.setRollNumber(request.getRollNumber());
        student.setCourse(request.getDegree());
        student.setBranch(request.getBranch());
        student.setYear(request.getYear());

        // Save to database
        studentRepository.save(student);

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful. Please login.");
        return response;
    }

    /**
     * Authenticates the user and returns a JWT token.
     */
    public Map<String, Object> login(AuthRequest request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials."));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid credentials.");
        }

        String token = jwtUtils.generateToken(student.getEmail(),student.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", "STUDENT");
        response.put("email", student.getEmail());
        response.put("name", student.getName());
        return response;
    }
}
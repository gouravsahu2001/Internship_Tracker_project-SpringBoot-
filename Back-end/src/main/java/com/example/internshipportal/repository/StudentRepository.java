package com.example.internshipportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.internshipportal.model.Student;
import com.example.internshipportal.model.User;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom query method to find student by email
    Optional<Student> findByEmail(String email);
    //User user = userRepository.findByEmail(email).orElseThrow();
}
package com.example.internshipportal.repository;

import com.example.internshipportal.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
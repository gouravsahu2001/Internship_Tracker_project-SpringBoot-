package com.example.internshipportal.repository;

import com.example.internshipportal.model.Internship;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
       List<Internship> findByTitleContaining(String keyword);
       
}
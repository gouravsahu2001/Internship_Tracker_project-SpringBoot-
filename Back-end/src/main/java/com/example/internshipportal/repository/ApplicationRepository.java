package com.example.internshipportal.repository;

import com.example.internshipportal.model.Application;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
	List<Application> findByStudentId(Long studentId);

	Long countByInternship_Id(Long id);
}

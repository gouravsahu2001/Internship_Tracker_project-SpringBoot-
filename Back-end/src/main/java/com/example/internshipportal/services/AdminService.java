package com.example.internshipportal.services;

import com.example.internshipportal.dto.StudentApplicationResponse;
import com.example.internshipportal.model.Application;
import com.example.internshipportal.model.Student;
import com.example.internshipportal.repository.ApplicationRepository;
import com.example.internshipportal.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<StudentApplicationResponse> getAllApplications() {
        List<Application> apps = applicationRepository.findAll();
        return apps.stream().map(app -> {
            StudentApplicationResponse dto = new StudentApplicationResponse();
            dto.setId(app.getId());
            dto.setStatus(app.getStatus());

            StudentApplicationResponse.InternshipInfo internship = new StudentApplicationResponse.InternshipInfo();
            internship.setTitle(app.getInternship().getTitle());
            internship.setCompany(app.getInternship().getCompany());
            dto.setInternship(internship);

            StudentApplicationResponse.StudentInfo student = new StudentApplicationResponse.StudentInfo();
            student.setId(app.getStudent().getId());
            student.setName(app.getStudent().getName());
            dto.setStudent(student);

            return dto;
        }).collect(Collectors.toList());
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void updateApplicationStatus(Long applicationId, String newStatus) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(newStatus);
        applicationRepository.save(app);
    }
}

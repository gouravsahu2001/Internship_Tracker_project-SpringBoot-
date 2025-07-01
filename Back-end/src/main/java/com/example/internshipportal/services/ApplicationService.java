package com.example.internshipportal.services;

import com.example.internshipportal.dto.ApplicationRequest;
import com.example.internshipportal.dto.ApplicationResponse;
import com.example.internshipportal.model.Application;
import com.example.internshipportal.model.Internship;
import com.example.internshipportal.model.Student;
import com.example.internshipportal.repository.ApplicationRepository;
import com.example.internshipportal.repository.InternshipRepository;
import com.example.internshipportal.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Application apply(ApplicationRequest request) {
        Internship internship = internshipRepository.findById(request.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Application application = new Application();
        application.setInternship(internship);
        application.setStudent(student);
        application.setCoverLetter(request.getCoverLetter());
        application.setResumeUrl(request.getResumeUrl());
        application.setStatus(request.getStatus() != null ? request.getStatus() : "PENDING");

        return applicationRepository.save(application);
    }
    public List<ApplicationResponse> getApplicationsByStudentId(Long studentId) {
        List<Application> applications = applicationRepository.findByStudentId(studentId);
        return applications.stream()
                .map(this::mapToApplicationResponse)  // Now this works because method exists
                .collect(Collectors.toList());
    }

    private ApplicationResponse mapToApplicationResponse(Application app) {
        ApplicationResponse res = new ApplicationResponse();
        res.setId(app.getId());
        res.setInternshipTitle(app.getInternship().getTitle());
        res.setStatus(app.getStatus());
        return res;
    }




    // ✅ Properly placed outside apply()
    public List<ApplicationResponse> getAllApplications() {
        List<Application> apps = applicationRepository.findAll();
        return apps.stream().map(app -> {
            ApplicationResponse res = new ApplicationResponse();
            res.setId(app.getId());
            res.setInternshipTitle(app.getInternship().getTitle());
            res.setStatus(app.getStatus());
            return res;
        }).collect(Collectors.toList());
    }
}

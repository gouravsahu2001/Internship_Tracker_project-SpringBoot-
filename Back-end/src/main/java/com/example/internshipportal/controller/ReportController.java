package com.example.internshipportal.controller;

import com.example.internshipportal.model.Application;
import com.example.internshipportal.repository.ApplicationRepository;
import com.example.internshipportal.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    InternshipRepository internshipRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @GetMapping("/applications-count")
    public List<InternshipReportDTO> getApplicationsCount() {
        return internshipRepository.findAll().stream()
                .map(i -> new InternshipReportDTO(
                        i.getTitle(),
                        applicationRepository.countByInternship_Id(i.getId())
                ))
                .collect(Collectors.toList());
    }

    private record InternshipReportDTO(String internship, Long applicants) {}
}
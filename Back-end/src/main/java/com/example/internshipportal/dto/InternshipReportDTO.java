package com.example.internshipportal.dto;

public class InternshipReportDTO {

    private String internship;
    private Long applicants;

    public InternshipReportDTO(String internship, Long applicants) {
        this.internship = internship;
        this.applicants = applicants;
    }

    public String getInternship() {
        return internship;
    }

    public void setInternship(String internship) {
        this.internship = internship;
    }

    public Long getApplicants() {
        return applicants;
    }

    public void setApplicants(Long applicants) {
        this.applicants = applicants;
    }
}
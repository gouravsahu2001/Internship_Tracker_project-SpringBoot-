package com.example.internshipportal.dto;

public class ApplicationResponse {
    private Long id;
    private String internshipTitle;
    private String status;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInternshipTitle() { return internshipTitle; }
    public void setInternshipTitle(String internshipTitle) { this.internshipTitle = internshipTitle; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

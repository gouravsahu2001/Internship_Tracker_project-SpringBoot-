package com.example.internshipportal.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Long internshipId;
    private Long studentId;
    private String coverLetter;
    private String resumeUrl;
    private String status;
}

package com.example.internshipportal.dto;

import lombok.Data;

@Data
public class StudentApplicationResponse {
    private Long id;
    private String status;

    private InternshipInfo internship;
    private StudentInfo student;

    @Data
    public static class InternshipInfo {
        private String title;
        private String company;
    }

    @Data
    public static class StudentInfo {
        private Long id;
        private String name;
    }
}

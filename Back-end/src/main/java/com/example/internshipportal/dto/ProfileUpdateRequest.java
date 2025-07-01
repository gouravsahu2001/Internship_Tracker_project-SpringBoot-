package com.example.internshipportal.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {
    private String name;
    private String phone;
    private String course;
    private String branch;
    private String year;
    private String skills;
}
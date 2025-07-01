package com.example.internshipportal.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String college;
    private String rollNumber;
    private String degree;
    private String branch;
    private String year;
}
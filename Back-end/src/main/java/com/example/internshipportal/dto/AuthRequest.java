package com.example.internshipportal.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
}
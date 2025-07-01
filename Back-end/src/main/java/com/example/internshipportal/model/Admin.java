package com.example.internshipportal.model;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends User {
    private String role = "ADMIN";  // Default value
}
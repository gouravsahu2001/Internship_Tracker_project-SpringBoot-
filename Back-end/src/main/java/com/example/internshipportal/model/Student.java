package com.example.internshipportal.model;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student extends User {
    private String course;
    private String branch;
    private String year;
    private String rollNumber;
    private String college;
    private String skills;
    private String resumeUrl;
    private String photoUrl;
    private boolean active;

	}

package com.example.internshipportal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "application") // match your table name if necessary
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "cover_letter")
    private String coverLetter;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internship_id")
    private Internship internship;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Internship getInternship() { return internship; }
    public void setInternship(Internship internship) { this.internship = internship; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}

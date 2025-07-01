package com.example.internshipportal.controller;

import com.example.internshipportal.dto.StudentApplicationResponse;
import com.example.internshipportal.model.Student;
import com.example.internshipportal.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/applications")
    public ResponseEntity<List<StudentApplicationResponse>> getAllApplications() {
        return ResponseEntity.ok(adminService.getAllApplications());
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentProfile(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getStudentById(id));
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest req) {
        adminService.updateApplicationStatus(id, req.getStatus());
        return ResponseEntity.ok("Status updated");
    }

    static class StatusUpdateRequest {
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}

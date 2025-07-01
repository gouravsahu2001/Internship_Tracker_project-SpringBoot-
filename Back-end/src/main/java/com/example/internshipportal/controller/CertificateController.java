package com.example.internshipportal.controller;

import com.example.internshipportal.model.Certificate;
import com.example.internshipportal.repository.CertificateRepository;
import com.example.internshipportal.services.CertificateService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "http://localhost:5173") 
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @Autowired
    private CertificateRepository certificateRepository;

    // Upload certificate
    @PostMapping("/upload")
    public ResponseEntity<String> uploadCertificate(
            @RequestParam("file") MultipartFile file,
            @RequestParam("applicationId") Long applicationId) {

        try {
            Certificate certificate = certificateService.uploadCertificate(applicationId, file);
            return ResponseEntity.ok("Certificate uploaded successfully: " + certificate.getFileName());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/download/{applicationId}")
    public void downloadCertificate(@PathVariable Long applicationId, HttpServletResponse response) throws IOException {
        Optional<Certificate> certificateOpt = certificateRepository.findByApplicationId(applicationId);
        if (certificateOpt.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Certificate not found");
            return;
        }

        Certificate certificate = certificateOpt.get();
        response.setContentType(MediaType.APPLICATION_PDF_VALUE); 
        response.setHeader("Content-Disposition", "attachment; filename=" + certificate.getFileName());
        response.getOutputStream().write((int) certificate.getData());
        response.getOutputStream().flush();
    }
}

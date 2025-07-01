package com.example.internshipportal.services;

import com.example.internshipportal.model.Application;
import com.example.internshipportal.model.Certificate;
import com.example.internshipportal.repository.ApplicationRepository;
import com.example.internshipportal.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
@Service
public class CertificateService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    public Certificate uploadCertificate(Long applicationId, MultipartFile file) throws IOException {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        String uploadDir = System.getProperty("user.dir") + "/certificates"; // Save in project root
        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs(); // Create directory if it doesn't exist
        }

        String fileName = "certificate_" + applicationId + ".pdf";
        String filePath = uploadDir + File.separator + fileName;

        File destinationFile = new File(filePath);
        file.transferTo(destinationFile); // Save the file

        Certificate certificate = new Certificate();
        certificate.setFileName(fileName);
        certificate.setFilePath(filePath);
        certificate.setApplication(application);

        return certificateRepository.save(certificate);
    }
    public Certificate getCertificateByApplicationId(Long applicationId) {
        return certificateRepository.findByApplicationId(applicationId)
                .orElseThrow(() -> new RuntimeException("Certificate not found for application ID: " + applicationId));
    }

	
}

package com.example.internshipportal.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) throws IOException {
        return uploadFile(file, "resumes");
    }

    @PostMapping("/photo")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file) throws IOException {
        return uploadFile(file, "photos");
    }

    private ResponseEntity<?> uploadFile(MultipartFile file, String folderName) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = "";

        if (originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String uniqueFileName = System.currentTimeMillis() + fileExtension;
        Path uploadPath = Paths.get(uploadDir + "/" + folderName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFileName);
        file.transferTo(filePath);

        Map<String, String> response = new HashMap<>();
        response.put("url", "/uploads/" + folderName + "/" + uniqueFileName);
        return ResponseEntity.ok(response);
    }
}
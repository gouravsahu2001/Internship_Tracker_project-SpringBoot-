package com.example.internshipportal.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Map<String, String> uploadFile(MultipartFile file, String folderName) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Please select a file to upload.");
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
        return response;
    }
}
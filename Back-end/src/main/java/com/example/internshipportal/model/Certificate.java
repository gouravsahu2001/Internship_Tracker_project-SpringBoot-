package com.example.internshipportal.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String filePath;

    @OneToOne
    @JoinColumn(name = "application_id")
    private Application application;

	public Object getData() {
		// TODO Auto-generated method stub
		return null;
	}

	
}

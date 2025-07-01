package com.example.internshipportal.security;

import com.example.internshipportal.model.Admin;
import com.example.internshipportal.model.Student;
import com.example.internshipportal.model.User;
import com.example.internshipportal.repository.UserRepository;

import jakarta.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        String role = "STUDENT"; // Default role
        if (user instanceof Admin) {
            role = "ADMIN";
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(role)
                .build();
    }

protected void configure(HttpSecurity http) throws Exception {
	http
	  .authorizeHttpRequests(auth -> auth
	    .requestMatchers("/api/auth/**").permitAll()
	    .requestMatchers("/api/applications/completed").hasRole("STUDENT")  // ✅
	    .anyRequest().authenticated()
	  )
	  .csrf().disable()
	  .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

}
}
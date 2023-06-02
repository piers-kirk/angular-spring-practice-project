package com.springBoot.practiceProject.spring;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.springBoot.practiceProject.spring.model.User;
import com.springBoot.practiceProject.spring.repository.UserRepository;

@SpringBootApplication
public class PracticeProjectApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository; 
	
	public static void main(String[] args) {
		SpringApplication.run(PracticeProjectApplication.class, args);
	}

	public void run(String... arg0) throws Exception {
		System.out.println("Inside run ....");
		List<User> users = userRepository.getAll();
		System.out.println(users);
	}
}

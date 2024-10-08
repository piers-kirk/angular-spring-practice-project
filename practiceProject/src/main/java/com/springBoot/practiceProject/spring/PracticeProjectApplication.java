package com.springBoot.practiceProject.spring;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.springBoot.practiceProject")
public class PracticeProjectApplication implements CommandLineRunner {
	
	@Value("${allowed.origins}")
	private String allowedOrigins;

	public static void main(String[] args) {
		SpringApplication.run(PracticeProjectApplication.class, args);
	}

	public void run(String... arg0) throws Exception {
	}

}

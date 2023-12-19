package com.springBoot.practiceProject;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.springBoot.practiceProject.spring.PracticeProjectApplication;

@ActiveProfiles("dev")
@SpringBootTest(classes = PracticeProjectApplication.class) // Provide the main application class
class PracticeProjectApplicationTests {

    @Test
    void contextLoads() {
        // This is a placeholder test
        // You can add your actual test logic here
        System.out.println("Test passed!");
    }
}

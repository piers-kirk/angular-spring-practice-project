package com.springBoot.practiceProject.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springBoot.practiceProject.spring.model.User;
import com.springBoot.practiceProject.spring.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("user/")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("getAll")
	public List<User> getUsers() {
		return this.userRepository.getAll();
	}

}

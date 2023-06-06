package com.springBoot.practiceProject.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springBoot.practiceProject.form.ShowForm;
import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.repository.ShowRepository;

@CrossOrigin
@RestController
@RequestMapping("show/")
public class ShowController {

	@Autowired
	private ShowRepository showRepository;

	@GetMapping("getAll")
	public List<Show> getShows() {
		return this.showRepository.getAll();
	}

	@PostMapping("save")
	public void saveShow(@RequestBody ShowForm showForm) {
		this.showRepository.save(showForm);
	}

}

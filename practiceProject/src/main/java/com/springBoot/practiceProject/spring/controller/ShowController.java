package com.springBoot.practiceProject.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("selectAll")
	public List<Show> getShows() {
		return this.showRepository.selectAll();
	}

	@PostMapping("save")
	public int saveShow(@RequestBody ShowForm showForm) {
		return this.showRepository.insert(showForm);
	}

	@DeleteMapping("delete/{showId}")
	public int deleteShow(@PathVariable long showId) {
		return this.showRepository.delete(showId);
	}
	
}

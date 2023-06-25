package com.springBoot.practiceProject.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springBoot.practiceProject.form.ShowForm;
import com.springBoot.practiceProject.report.ShowReportGenerator;
import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.service.ShowService;

@CrossOrigin
@RestController
@RequestMapping("show/")
public class ShowController {

	@Autowired
	private ShowService showService;

	@Autowired 
	private ShowReportGenerator showReportGenerator;
	
	@GetMapping("select/{showId}")
	public List<Show> select(@PathVariable Long showId) {
		return this.showService.select(showId);
	}
	
	@GetMapping("selectAll")
	public List<Show> selectAll() {
		return this.showService.selectAll();
	}

	@PostMapping("save")
	public int saveShow(@RequestBody ShowForm showForm) {
		boolean isUpdate = showForm.getShowId() != null; 
		if (isUpdate) {
			return this.showService.update(showForm);
		} else {
			return this.showService.insert(showForm);
		}
	}

	@DeleteMapping("delete/{showIds}")
	public int deleteShow(@PathVariable List<Long> showIds) {
		return this.showService.delete(showIds);
	}
	
	@GetMapping("export")
	public ResponseEntity<byte[]> export() throws Exception {
		return showReportGenerator.generateReport();
	}
}

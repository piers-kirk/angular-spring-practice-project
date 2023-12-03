package com.springBoot.practiceProject.spring.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springBoot.practiceProject.deleteValidator.ShowFormDeleteValidator;
import com.springBoot.practiceProject.form.ShowForm;
import com.springBoot.practiceProject.report.ShowReportGenerator;
import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.service.ShowService;
import com.springBoot.practiceProject.validator.ShowFormValidator;

@RestController
// @CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("show/")
public class ShowController {

	@Autowired
	private ShowService showService;

	@Autowired 
	private ShowReportGenerator showReportGenerator;
	
	@Autowired
	private ShowFormValidator showFormValidator; 
	
	@Autowired
	private ShowFormDeleteValidator deleteValidator;

	
	@GetMapping("select/{showId}")
	public List<Show> select(@PathVariable Long showId) {
		return this.showService.select(showId);
	}
	
	@GetMapping("selectAll")
	public List<Show> selectAll() {
		return this.showService.selectAll();
	}

	@PostMapping("save")
	public ResponseEntity<?> saveShow(@Validated @RequestBody ShowForm showForm, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        List<String> errors = bindingResult.getAllErrors()
	                .stream()
	                .map(ObjectError::getDefaultMessage)
	                .collect(Collectors.toList());

	        return ResponseEntity.badRequest().body(errors);
	    }

	    boolean isUpdate = showForm.getShowId() != null;
	    try {
	        if (isUpdate) {
	            this.showService.update(showForm);
	        } else {
	            this.showService.insert(showForm);
	        }
	        return ResponseEntity.ok().body("{\"message\": \"Show saved successfully.\"}");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("{\"message\": \"An error occurred while saving the show.\"}");
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
	
    @InitBinder("deleteForm")
    public void initDeleteFormBinder(WebDataBinder binder) {
        binder.addValidators(deleteValidator);
    }
	
	@InitBinder("showForm")
    public void initShowFormBinder(WebDataBinder binder) {
        binder.addValidators(showFormValidator);
    }
}

package com.springBoot.practiceProject.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import com.springBoot.practiceProject.form.ShowForm;

@Component
public class ShowFormValidator implements Validator {
	
	@Override
	public boolean supports(Class<?> clazz) {
		return ShowForm.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "episodesWatched", "show.episodesWatched.empty", "Episodes Watched is required.");		
		ShowForm showForm = (ShowForm) target;
		if (showForm.getEpisodesWatched() < 0) {
	        errors.rejectValue("episodesWatched", "show.episodesWatched.invalid", "Episodes Watched must be a non-negative integer.");
		} 
	}
}

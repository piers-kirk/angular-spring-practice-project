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
//		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "showName", "show.showName.empty", "Show Name is required.");
//		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "streamingPlatform", "show.streamingPlatform.empty", "Streaming Platform is required.");
//		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "genre", "show.genre.empty", "Genre is required.");
//		
//		ShowForm showForm = (ShowForm) target;
//
//		// Additional validation logic
//		if (showForm.getShowName().length() < 18) {
//	        errors.rejectValue("showName", "show.showName.invalid", "Show Name must have at least 18 characters.");
//		}
	}
}

package com.springBoot.practiceProject.report;

import org.springframework.http.ResponseEntity;

public interface ObjectReportGenerator<Model> {

	public abstract ResponseEntity<byte[]> generateReport() throws Exception;

}

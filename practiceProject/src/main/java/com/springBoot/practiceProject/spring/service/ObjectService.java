package com.springBoot.practiceProject.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

public abstract class ObjectService<Model, Form> {

	@Autowired
	protected Environment env;
		
	public abstract List<Model> select(long id);
	
	public abstract List<Model> selectAll();
	
	public abstract int insert(Form form);
	
	public abstract int update(Form form);

	public abstract int delete(List<Long> id);

}

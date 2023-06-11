package com.springBoot.practiceProject.spring.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

@Repository
public abstract class ObjectRepository<Model, Form> {

	@Autowired
	protected Environment env;
		
	public abstract List<Model> select();
	
	public abstract int insert(Form form);
	
	public abstract int update(Form form);

	public abstract int delete(List<Long> id);

}

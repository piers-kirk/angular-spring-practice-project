package com.springBoot.practiceProject.spring.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

@Repository
public abstract class ObjectRepository<Model, Form> {

	@Autowired
	protected Environment env;
		
	public abstract Model select(long id);

	public abstract List<Model> selectAll();
	
	public abstract int insert(Form t);
	
	public abstract int update(Form t);

	public abstract Model delete(long id);

}

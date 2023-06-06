package com.springBoot.practiceProject.spring.repository;

import java.util.List;

public interface ObjectRepository<Model, Form> {

	public Model get(long id);

	public List<Model> getAll();
	
	public int save(Form t);

	public Model delete(long id);

}

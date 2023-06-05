package com.springBoot.practiceProject.spring.repository;

public interface ObjectRepository<T, K> {

	public void store(K t);

	public T retrieve(long id);

	public T search(String name);

	public T delete(long id);
	
}

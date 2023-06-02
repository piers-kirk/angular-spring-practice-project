package com.springBoot.practiceProject.spring.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.springBoot.practiceProject.spring.model.User;
import com.springBoot.practiceProject.spring.model.UserRowMapper;

@Repository
public class UserRepository implements ObjectRepository<User> {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired 
	private UserRowMapper userRowMapper; 
	
	@Override
	public void store(User t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public User retrieve(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User search(String name) {
		return null;
	}
	
	@Override
	public User delete(long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List<User> getAll() {
		String sql = "SELECT * FROM [IMDB_DB].[dbo].[Persons]";
		List<User> employees = jdbcTemplate.query(sql, userRowMapper);
		return employees;
	}
}
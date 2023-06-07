package com.springBoot.practiceProject.spring.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.springBoot.practiceProject.form.UserForm;
import com.springBoot.practiceProject.spring.model.User;
import com.springBoot.practiceProject.spring.model.UserRowMapper;

@Repository
public class UserRepository implements ObjectRepository<User, UserForm> {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private UserRowMapper userRowMapper;

	@Override
	public User get(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override 
	public List<User> getAll() {
		String sql = "SELECT * FROM [IMDB_DB].[dbo].[Persons]";
		List<User> employees = jdbcTemplate.query(sql, userRowMapper);
		return employees;
	}
	
	@Override
	public int save(UserForm t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public User delete(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
package com.springBoot.practiceProject.spring.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class UserRowMapper implements RowMapper<User> {

	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		User user = new User();
		user.setId(rs.getLong("PersonID"));
		user.setFirstName(rs.getString("FirstName"));
		user.setLastName(rs.getString("LastName"));
		user.setAddress(rs.getString("Address"));
		user.setCity(rs.getString("City"));
		return user;
	}

}

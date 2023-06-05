package com.springBoot.practiceProject.spring.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.springBoot.practiceProject.form.ShowForm;
import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.model.ShowRowMapper;

@Repository
public class ShowRepository implements ObjectRepository<Show, ShowForm> {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired 
	private ShowRowMapper showRowMapper; 
	
	@Override
	public void store(ShowForm showForm) {
		String sql = "SELECT * FROM [IMDB_DB].[dbo].[Persons]";
		jdbcTemplate.update(sql);	
	}

	@Override
	public Show retrieve(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Show search(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Show delete(long id) {
		// TODO Auto-generated method stub
		return null;
	} 
	
	public List<Show> getAll() {
		String sql = "SELECT * FROM [IMDB_DB].[dbo].[Shows]";
		List<Show> shows = jdbcTemplate.query(sql, showRowMapper);
		return shows;
	}
	
}
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
	public Show get(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Show> getAll() {
		String sql = "SELECT * FROM [IMDB_DB].[dbo].[Shows]";
		List<Show> shows = jdbcTemplate.query(sql, showRowMapper);
		return shows;
	}
	
	@Override
	public int save(ShowForm showForm) {
		String sql = "INSERT INTO [IMDB_DB].[dbo].[Shows] VALUES (?, ?, ?, ?)";
		return jdbcTemplate.update(sql,
				new Object[] { showForm.getId(), showForm.getShowName(), showForm.getStreamingPlatform(),  showForm.getGenre() });
	}

	@Override
	public Show delete(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
package com.springBoot.practiceProject.spring.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.springBoot.practiceProject.form.ShowForm;
import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.model.ShowRowMapper;

@Repository
public class ShowRepository extends ObjectRepository<Show, ShowForm> {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ShowRowMapper showRowMapper;

	@Override
	public Show select(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Show> selectAll() {
		String sql = env.getProperty("repository.show.query.selectAll");
		List<Show> shows = jdbcTemplate.query(sql, showRowMapper);
		return shows;
	}

	@Override
	public int insert(ShowForm showForm) {
		String sql = env.getProperty("repository.show.query.insert");
		return jdbcTemplate.update(sql,
				new Object[] { showForm.getShowName(), showForm.getStreamingPlatform(), showForm.getGenre() });
	}

	@Override
	public int update(ShowForm t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(long showId) {
		String sql = env.getProperty("repository.show.query.delete");
		return jdbcTemplate.update(sql, new Object[] { showId });
	}

}
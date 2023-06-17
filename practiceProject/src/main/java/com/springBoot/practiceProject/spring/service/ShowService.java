package com.springBoot.practiceProject.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;

import com.springBoot.practiceProject.form.ShowForm;
import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.model.ShowRowMapper;

@Service
public class ShowService extends ObjectService<Show, ShowForm> {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ShowRowMapper showRowMapper;

	@Override
	public List<Show> select() {
		return jdbcTemplate.query(env.getProperty("repository.show.query.select"), showRowMapper);
	}
	
	@Override
	public int insert(ShowForm showForm) {
//		MapSqlParameterSource parameters = new MapSqlParameterSource();
//		parameters.addValue("showName", showForm.getShowName());
//		parameters.addValue("streamingPlatform", showForm.getStreamingPlatform());
//		parameters.addValue("genre", showForm.getGenre());
//      return jdbcTemplate.update(env.getProperty("repository.show.query.insert"), parameters);
		return jdbcTemplate.update(env.getProperty("repository.show.query.insert"),
				new Object[] { showForm.getShowName(), showForm.getStreamingPlatform(), showForm.getGenre() });

	}

	@Override
	public int update(ShowForm showForm) {
//		MapSqlParameterSource parameters = new MapSqlParameterSource();
//		parameters.addValue("showId", showForm.getId());
//		parameters.addValue("showName", showForm.getShowName());
//		parameters.addValue("streamingPlatform", showForm.getStreamingPlatform());
//		parameters.addValue("genre", showForm.getGenre());
//		return jdbcTemplate.update(env.getProperty("repository.show.query.update"), parameters);
		return jdbcTemplate.update(env.getProperty("repository.show.query.update"),
				new Object[] { showForm.getShowName(), showForm.getStreamingPlatform(), showForm.getGenre(), showForm.getId() });
	}

	@Override
	public int delete(List<Long> showIds) {
//		return jdbcTemplate.update(env.getProperty("repository.show.query.delete"),
//				new MapSqlParameterSource("showIds", showIds));
		int i = 0; 
		for (; i < showIds.size(); i++) {
			jdbcTemplate.update(env.getProperty("repository.show.query.delete"), new Object[] { showIds.get(i) });
		}
		return i;
	}

}
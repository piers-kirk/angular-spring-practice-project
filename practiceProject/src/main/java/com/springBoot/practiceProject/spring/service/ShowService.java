package com.springBoot.practiceProject.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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
	public List<Show> select(long showId) {
		return jdbcTemplate.query(env.getProperty("repository.tblShow.query.select"), showRowMapper, new Object[] { showId });
	}

	@Override
	public List<Show> selectAll() {
		return jdbcTemplate.query(env.getProperty("repository.tblShow.query.selectAll"), showRowMapper);
	}

	@Override
	public int insert(ShowForm showForm) {
		return jdbcTemplate.update(env.getProperty("repository.tblShow.query.insert"),
				new Object[] { showForm.getShowName(), 
						showForm.getEpisodesWatched(), 
						showForm.getDateLastWatched(),
						showForm.getThoughts(), 
						showForm.getUserRating()
						});
	}

	@Override
	public int update(ShowForm showForm) {
		return jdbcTemplate.update(env.getProperty("repository.tblShow.query.update"), 				
				new Object[] { showForm.getShowName(), 
				showForm.getEpisodesWatched(), 
				showForm.getDateLastWatched(),				
				showForm.getThoughts(),
				showForm.getUserRating(),
				showForm.getShowId()
				});
	}

	@Override
	public int delete(List<Long> showIds) {
		int i = 0;
		for (; i < showIds.size(); i++) {
			jdbcTemplate.update(env.getProperty("repository.tblShow.query.delete"), new Object[] { showIds.get(i) });
		}
		return i;
	}

}
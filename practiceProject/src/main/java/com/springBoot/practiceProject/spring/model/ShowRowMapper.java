package com.springBoot.practiceProject.spring.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class ShowRowMapper implements RowMapper<Show> {

	@Override
	public Show mapRow(ResultSet rs, int rowNum) throws SQLException {
		Show show = new Show();
		show.setShowId(rs.getLong("ShowID"));
		show.setShowName(rs.getString("ShowName"));
		show.setEpisodesWatched(rs.getInt("EpisodesWatched"));
		show.setDateLastWatched(rs.getDate("DateLastWatched"));
		show.setThoughts(rs.getString("Thoughts"));
		show.setUserRating(rs.getInt("UserRating"));
		return show;
	}

}

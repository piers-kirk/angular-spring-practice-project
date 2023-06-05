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
		show.setId(rs.getLong("ShowID"));
		show.setShowName(rs.getString("ShowName"));
		show.setStreamingPlatform(rs.getString("StreamingPlatform"));
		show.setGenre(rs.getString("Genre"));
		return show;
	}

}

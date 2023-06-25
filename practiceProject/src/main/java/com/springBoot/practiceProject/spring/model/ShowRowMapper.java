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
		show.setStreamingPlatform(rs.getString("StreamingPlatform"));
		show.setGenre(rs.getString("Genre"));
		show.setRating(rs.getString("Rating"));
		show.setRunningTime(rs.getLong("RunningTime"));
		show.setDirectedBy(rs.getString("DirectedBy"));
		show.setStarring(rs.getString("Starring"));
		show.setReception(rs.getString("Reception"));
		return show;
	}

}

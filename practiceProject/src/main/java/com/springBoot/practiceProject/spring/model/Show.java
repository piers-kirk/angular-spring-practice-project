package com.springBoot.practiceProject.spring.model;

import java.sql.Date;

public class Show {

	private long showId;
	private String showName;
	private long episodesWatched;
	private Date dateLastWatched;
	private String thoughts;
	private long userRating;

	public long getShowId() {
		return showId;
	}

	public void setShowId(long showId) {
		this.showId = showId;
	}

	public String getShowName() {
		return showName;
	}

	public void setShowName(String showName) {
		this.showName = showName;
	}

	public long getEpisodesWatched() {
		return episodesWatched;
	}

	public void setEpisodesWatched(long episodesWatched) {
		this.episodesWatched = episodesWatched;
	}

	public Date getDateLastWatched() {
		return dateLastWatched;
	}

	public void setDateLastWatched(Date dateLastWatched) {
		this.dateLastWatched = dateLastWatched;
	}

	public String getThoughts() {
		return thoughts;
	}

	public void setThoughts(String thoughts) {
		this.thoughts = thoughts;
	}

	public long getUserRating() {
		return userRating;
	}

	public void setUserRating(long userRating) {
		this.userRating = userRating;
	}

}

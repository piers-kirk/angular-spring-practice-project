package com.springBoot.practiceProject.form;

import java.sql.Date;

public class ShowForm {

	private Long showId;
	private String showName;
	private Integer episodesWatched;
	private Date dateLastWatched;
	private String thoughts;
	private Integer userRating;

	public Long getShowId() {
		return showId;
	}

	public void setShowId(Long showId) {
		this.showId = showId;
	}

	public String getShowName() {
		return showName;
	}

	public void setShowName(String showName) {
		this.showName = showName;
	}

	public Integer getEpisodesWatched() {
		return episodesWatched;
	}

	public void setEpisodesWatched(Integer episodesWatched) {
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

	public Integer getUserRating() {
		return userRating;
	}

	public void setUserRating(Integer userRating) {
		this.userRating = userRating;
	}

}
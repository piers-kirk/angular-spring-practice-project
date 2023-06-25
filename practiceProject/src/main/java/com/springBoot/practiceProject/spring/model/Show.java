package com.springBoot.practiceProject.spring.model;

public class Show {

	private long showId;
	private String showName;
	private String streamingPlatform;
	private String genre;
	private String rating;
	private Long runningTime;
	private String directedBy;
	private String starring;
	private String reception;

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

	public String getStreamingPlatform() {
		return streamingPlatform;
	}

	public void setStreamingPlatform(String streamingPlatform) {
		this.streamingPlatform = streamingPlatform;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public Long getRunningTime() {
		return runningTime;
	}

	public void setRunningTime(Long runningTime) {
		this.runningTime = runningTime;
	}

	public String getDirectedBy() {
		return directedBy;
	}

	public void setDirectedBy(String directedBy) {
		this.directedBy = directedBy;
	}

	public String getStarring() {
		return starring;
	}

	public void setStarring(String starring) {
		this.starring = starring;
	}

	public String getReception() {
		return reception;
	}

	public void setReception(String reception) {
		this.reception = reception;
	}

}

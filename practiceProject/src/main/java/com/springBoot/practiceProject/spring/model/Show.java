package com.springBoot.practiceProject.spring.model;

public class Show {

	private long id;
	private String showName;
	private String streamingPlatform;
	private String genre;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

}

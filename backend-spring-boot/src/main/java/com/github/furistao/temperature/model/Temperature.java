package com.github.furistao.temperature.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "temperature")
public class Temperature {

	@Id
	private long id;

	@Column(name = "date")
	@Temporal(TemporalType.DATE)
	private java.util.Date date;

	@Column(name = "temperature")
	private String temperature;

	public Temperature() {
	}

	public Temperature(String temperature) {
		super();
		this.temperature = temperature;
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public java.util.Date getDate() {
		return this.date;
	}

	public void setDate(java.util.Date date) {
		this.date = date;
	}

	public String getTemperature() {
		return this.temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}
}

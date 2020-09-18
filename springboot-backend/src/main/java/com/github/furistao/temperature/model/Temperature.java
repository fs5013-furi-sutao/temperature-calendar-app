package com.github.furistao.temperature.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "temperature")
public class Temperature {
	
	@Id
	// @GeneratedValue(strategy = GenerationType.IDENTITY)
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

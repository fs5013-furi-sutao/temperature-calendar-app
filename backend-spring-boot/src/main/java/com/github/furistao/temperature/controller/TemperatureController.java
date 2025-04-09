package com.github.furistao.temperature.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.github.furistao.temperature.exception.ResourceNotFoundException;
import com.github.furistao.temperature.model.Temperature;
import com.github.furistao.temperature.repository.TemperatureRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Tag(name = "体温記録情報", description = "体温記録の情報を収集・管理するAPI")
@RequestMapping("/api/v1/")
public class TemperatureController {

	@Autowired
	private TemperatureRepository temperatureRepository;

	// get all employees
	@GetMapping("/temperatures")
	public List<Temperature> getAllTemperature() {
		return temperatureRepository.findAll();
	}

	// get temperature of max id
	@GetMapping("/temperatures/maxid")
	public Temperature getMaxIdTemperature() {
		return temperatureRepository.getMaxIdTemperature();
	}

	// create temperature rest api
	@PostMapping("/temperatures")
	public Temperature createTemperature(@RequestBody Temperature temperature) {
		return temperatureRepository.save(temperature);
	}

	// get temperature by id rest api
	@GetMapping("/temperatures/{id}")
	public ResponseEntity<Temperature> getTemperatureById(@PathVariable Long id) {
		Temperature temperature = temperatureRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Temperature not exist with id :" + id));
		return ResponseEntity.ok(temperature);
	}

	// update temperature rest api

	@PutMapping("/temperatures/{id}")
	public ResponseEntity<Temperature> updateTemperature(@PathVariable Long id,
			@RequestBody Temperature temperatureDetails) {

		Temperature temperature = temperatureRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Temperature for updating not exist with id :" + id));
		System.out.println("temperatureDetails.title=" + temperatureDetails.getTemperature());
		temperature.setTemperature(temperatureDetails.getTemperature());

		Temperature updatedTemperature = temperatureRepository.save(temperature);
		return ResponseEntity.ok(updatedTemperature);
	}

	// delete employee rest api
	@DeleteMapping("/temperatures/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTemperature(@PathVariable Long id) {
		Temperature temperature = temperatureRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Temperature not exist with id :" + id));

		temperatureRepository.delete(temperature);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// get temperatures during the days
	@GetMapping("/temperatures/date/from/{strFrom}/to/{srtTo}")
	// http://localhost:8080/api/v1/temperatures/date/from/2020-09-03/to/2020-09-30
	public List<Temperature> getTemperatureByDateBetween(@PathVariable String strFrom,
			@PathVariable String srtTo) {

		return temperatureRepository.findByDateBetween(strFrom, srtTo);
	}
}

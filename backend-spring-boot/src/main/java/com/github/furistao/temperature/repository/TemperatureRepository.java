package com.github.furistao.temperature.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.github.furistao.temperature.model.Temperature;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Long> {

    @Query(value = "SELECT t.id, t.date, t.temperature FROM temperature t ORDER BY t.id DESC LIMIT 1",
            nativeQuery = true)
    Temperature getMaxIdTemperature();

    @Query(value = "SELECT t.id, t.date, t.temperature FROM temperature t WHERE t.date BETWEEN :from AND :to ORDER BY t.date ASC",
            nativeQuery = true)
    List<Temperature> findByDateBetween(@Param("from") String from, @Param("to") String to);
}

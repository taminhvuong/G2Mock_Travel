package com.example.travel_mock2302.repository;

import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TripRepository  extends JpaRepository<Trip, String> {
    Trip findByCodeTrip(String codeTrip);

    List<Trip> findAll();

    @Transactional
    void deleteByCodeTrip(String codeTrip);

    @Transactional
    @Modifying
    @Query("delete from Trip where codeTrip IN (:ids)")
    public void deleteByListCodeTrip(@Param("ids") List<String> ids);


}
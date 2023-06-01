package com.example.travel_mock2302.repository;

import com.example.travel_mock2302.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository

public interface TourRepository extends JpaRepository<Tour, String> {
    Tour findByCodeTour(String codeTour);

    List<Tour> findAll();

    @Transactional
    void deleteByCodeTour(String codeTour);

    @Transactional
    @Modifying
    @Query("delete from Tour where codeTour IN (:ids)")
    public void deleteByListId(@Param("ids") List<String> ids);


}

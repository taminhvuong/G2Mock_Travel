package com.vti.repository;

import com.vti.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, String>, JpaSpecificationExecutor<Trip> {
    Trip findByCodeTrip(String codeTrip);

    List<Trip> findAll();

    boolean existsTripByCodeTrip(String codeTrip);

    @Transactional
    void deleteByCodeTrip(String codeTrip);

//    @Transactional
////    @Query("from DetailTour  inner join Trip  on Trip.tour.codeTour= DetailTour.tour.codeTour where DetailTour.tour.codeTour =:pcodeTour")
//    @Query(" from DetailTour dt" +
//
//            " inner join Trip tr on tr.tour.codeTour= dt.tour.codeTour" +
//            " where tr.codeTrip =:codeTrip ")
//
//    public List<DetailTour> getDetailTourByCodeTrip(@Param("codeTrip") String codeTrip);

    @Transactional
    @Modifying
    @Query("delete from Trip where codeTrip IN (:codeTrips)")
    public void deleteByListCodeTrip(@Param("codeTrips") List<String> codeTrips);


}
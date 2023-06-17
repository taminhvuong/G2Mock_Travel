package com.vti.repository;

import com.vti.entity.DetailTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface DetailTourResponsitory extends JpaRepository<DetailTour,Integer> {
    @Transactional
//    @Query("from DetailTour  inner join Trip  on Trip.tour.codeTour= DetailTour.tour.codeTour where DetailTour.tour.codeTour =:pcodeTour")
    @Query(" from DetailTour dt  where dt.tour.codeTour =:codeTour ")

    public List<DetailTour> getDetailTourByCodeTrip(@Param("codeTour") String codeTour);
//    @Transactional
//    @Query(" from DetailTour dt" +
//
//            " inner join Trip tr on tr.tour.codeTour= dt.tour.codeTour" +
//            " where tr.tour.codeTour =:codeTour ")
//
//    public List<DetailTour> getDetailTourByCodeTrip(@Param("codeTour") String codeTour);
}

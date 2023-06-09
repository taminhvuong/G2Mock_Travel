package com.vti.repository;

import com.vti.entity.Tour;
import com.vti.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, String>, JpaSpecificationExecutor<Tour> {
    Tour findByCodeTour(String codeTour);

    List<Tour> findAll();

    boolean existsTourByCodeTour(String codeTour);

    @Transactional
    void deleteByCodeTour(String codeTour);

    @Transactional
    @Modifying
    @Query("delete from Tour where codeTour IN (:ids)")
    public void deleteByListCodeTour(@Param("ids") List<String> ids);


}

package com.vti.service;


import com.vti.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITourService {

    Page<Tour> getAllTours(Pageable pageable);

    Tour getTourByCode(String codeTour);

    void createTour(Tour tour);

    void updateTour(String codeTour, Tour tour);

    void deleteTour(String codeTour);

    boolean isTourExists(String codeTour);

}

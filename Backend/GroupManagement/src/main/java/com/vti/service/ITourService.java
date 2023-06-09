package com.vti.service;


import com.vti.dto.BookingFormForCreate;
import com.vti.dto.TourFormForCreate;
import com.vti.dto.TourFormForUpdate;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITourService {

    Page<Tour> getAllTours(Pageable pageable, TourFilter filter, String search);

    Tour getTourByCode(String codeTour);

    void createTour(TourFormForCreate tourFormForCreate);

    void updateTour(String codeTour, TourFormForUpdate  tourFormForUpdate);

    void deleteTour(String codeTour);

    boolean isTourExists(String codeTour);

}

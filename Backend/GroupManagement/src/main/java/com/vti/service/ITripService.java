package com.vti.service;


import com.vti.dto.TripFormForCreate;
import com.vti.dto.TripFormForUpdate;
import com.vti.dto.filter.TripFilter;
import com.vti.entity.DetailTour;
import com.vti.entity.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITripService {
    public Trip findByCodeTrip(String codeTrip);
    public Page<Trip> findAll(Pageable pageable, TripFilter filter, String search);
    public boolean existsTripByCodeTrip(String codeTrip);
    public  void deleteByCodeTrip(String codeTrip);
//    public DetailTour getDetailTourByCodeTrip(String codeTrip);
    void deleteByListCodeTrip(List<String> codeTrips);
    public void saveTrip (TripFormForCreate tripFormForCreate);

    public  void updateTripByCodeTrip(String codeTrip, TripFormForUpdate tripFormForUpdate);
    public  void updateTripNumberOfPassengersByCodeTrip(String codeTrip );
}

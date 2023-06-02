package com.vti.service;


import com.vti.dto.FormCreateTrip;
import com.vti.dto.FormUpdateTrip;
import com.vti.dto.filter.TripFilter;
import com.vti.entity.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ITripService {
    public Trip findByCodeTrip(String codeTrip);
    public Page<Trip> findAll(Pageable pageable, TripFilter filter, String search);
    public  void deleteByCodeTrip(String codeTrip);
    public void saveTrip (FormCreateTrip formCreateTrip);

    public  void updateByCodeTrip(String codeTrip, FormUpdateTrip formUpdateTrip);
}

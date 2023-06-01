package com.example.travel_mock2302.service;

import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.entity.Trip;
import com.example.travel_mock2302.form.FormCreateTour;
import com.example.travel_mock2302.form.FormCreateTrip;
import com.example.travel_mock2302.form.FormUpdateTour;
import com.example.travel_mock2302.form.FormUpdateTrip;

import java.util.List;

public interface ITripService {
    public Trip findByCodeTour(String codeTrip);
    public List<Trip> findAll();
    public  void deleteByCodeTrip(String codeTrip);
    public void saveTrip (FormCreateTrip formCreateTrip);

    public  void updateByCodeTrip(String codeTour, FormUpdateTrip formUpdateTrip);
}

package com.example.travel_mock2302.service;

import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.form.FormCreateTour;
import com.example.travel_mock2302.form.FormUpdateTour;

import java.util.List;

public interface ITourService {
    public Tour findByCodeTour(String codeTour);
    public List<Tour> findAll();
    public  void deleteByCodeTour(String codeTour);
    public void saveTour(FormCreateTour formCreateTour);

    public  void updateByCodeTour(String codeTour, FormUpdateTour formUpdateTour);
}

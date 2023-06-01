package com.example.travel_mock2302.service;

import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.form.FormCreateTour;
import com.example.travel_mock2302.form.FormUpdateTour;
import com.example.travel_mock2302.repository.TourRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TourService implements ITourService {
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Tour findByCodeTour(String codeTour) {
        return tourRepository.findByCodeTour(codeTour);
    }

    @Override
    public List<Tour> findAll() {
        return tourRepository.findAll();
    }

    @Override
    public void deleteByCodeTour(String codeTour) {
        tourRepository.deleteById(codeTour);
    }

    @Override
    public void saveTour(FormCreateTour formCreateTour) {
        Tour tour = modelMapper.map(formCreateTour, Tour.class);
        tourRepository.save(tour);
    }

    @Override
    public void updateByCodeTour(String codeTour, FormUpdateTour formUpdateTour) {

        Tour tour =tourRepository.findByCodeTour(codeTour);
        tour=modelMapper.map(formUpdateTour,Tour.class);
        tourRepository.save(tour);
    }
}

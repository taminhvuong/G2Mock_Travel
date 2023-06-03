package com.vti.service;


import com.vti.entity.Tour;
import com.vti.repository.TourRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import java.util.Optional;

@Service
@Transactional
public class TourService implements ITourService {
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<Tour> getAllTours(Pageable pageable) {
        return tourRepository.findAll(pageable);
    }

    @Override
    public Tour getTourByCode(String codeTour) {
        Optional<Tour> tourOpt = tourRepository.findById(codeTour);
        return tourOpt.orElse(null);
    }

    @Override
    public void createTour(Tour tour) {
        tourRepository.save(tour);
    }

    @Override
    public void updateTour(String codeTour, Tour tour) {
        Tour existingTour = getTourByCode(codeTour);
        if (existingTour != null) {
            tour.setCodeTour(existingTour.getCodeTour());
            tourRepository.save(tour);
        }
    }

    @Override
    public void deleteTour(String codeTour) {
        tourRepository.deleteById(codeTour);
    }

    @Override
    public boolean isTourExists(String codeTour) {
        return tourRepository.existsById(codeTour);
    }

}

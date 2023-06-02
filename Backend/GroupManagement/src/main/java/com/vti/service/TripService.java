package com.vti.service;


import com.vti.dto.FormCreateTrip;
import com.vti.dto.FormUpdateTrip;

import com.vti.dto.filter.TripFilter;
import com.vti.entity.Tour;
import com.vti.entity.Trip;
import com.vti.repository.TourRepository;
import com.vti.repository.TripRepository;
import com.vti.specification.TripSpecificationBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TripService implements ITripService {
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Trip findByCodeTrip(String codeTrip) {
        return tripRepository.findByCodeTrip(codeTrip);
    }

    @Override
    public Page<Trip> findAll(Pageable pageable, TripFilter filter, String search){


        TripSpecificationBuilder specification = new TripSpecificationBuilder(filter, search);

//        return tripRepository.findAll(specification.build(), pageable);
        return tripRepository.findAll(specification.build(),pageable);
    }
    @Override
    public void deleteByCodeTrip(String codeTrip) {

        tripRepository.deleteById(codeTrip);
    }

    @Override
    public void saveTrip(FormCreateTrip formCreateTrip) {
        Tour tour=tourRepository.findByCodeTour(formCreateTrip.getTourCode());
        Trip trip = modelMapper.map(formCreateTrip, Trip.class);
        trip.setTour(tour);
        tripRepository.save(trip);
    }

    @Override
    public void updateByCodeTrip(String codeTrip, FormUpdateTrip formUpdateTour) {
        Tour tour=tourRepository.findByCodeTour(formUpdateTour.getTourCode());
        Trip trip = tripRepository.findByCodeTrip(codeTrip);
        trip.setTour(tour);
        trip = modelMapper.map(formUpdateTour, Trip.class);
        tripRepository.save(trip);
    }
}

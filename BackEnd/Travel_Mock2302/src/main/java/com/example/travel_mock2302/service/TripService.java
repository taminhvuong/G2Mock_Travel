package com.example.travel_mock2302.service;

import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.entity.Trip;
import com.example.travel_mock2302.form.FormCreateTour;
import com.example.travel_mock2302.form.FormCreateTrip;
import com.example.travel_mock2302.form.FormUpdateTour;
import com.example.travel_mock2302.form.FormUpdateTrip;
import com.example.travel_mock2302.repository.TourRepository;
import com.example.travel_mock2302.repository.TripRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Trip> findAll() {
        return tripRepository.findAll();
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

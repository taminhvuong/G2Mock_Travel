package com.vti.service;


import com.vti.dto.TripFormForCreate;
import com.vti.dto.TripFormForUpdate;

import com.vti.dto.filter.TripFilter;
import com.vti.entity.DetailTour;
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
        return tripRepository.findAll(specification.build(),pageable);
    }

    @Override
    public boolean existsTripByCodeTrip(String codeTrip) {
        return tripRepository.existsTripByCodeTrip(codeTrip);
    }

    @Override
    public void deleteByCodeTrip(String codeTrip) {

        tripRepository.deleteById(codeTrip);
    }

//    @Override
//    public DetailTour getDetailTourByCodeTrip(String codeTrip) {
//        tripRepository.getDetailTourByCodeTrip(codeTrip);
//        return null;
//    }

    @Override
    public void saveTrip(TripFormForCreate tripFormForCreate) {
        if (tripFormForCreate.getTourCode() !=null){
        Tour tour=tourRepository.findByCodeTour(tripFormForCreate.getTourCode());
        Trip trip = modelMapper.map(tripFormForCreate, Trip.class);
        trip.setTour(tour);
        tripRepository.save(trip);
        }
        else{
          //  Trip trip=new Trip();
        Trip trip = modelMapper.map(tripFormForCreate, Trip.class);
           // trip.setCodeTrip(tripFormForCreate.getCodeTrip());
            tripRepository.save(trip);
        }
    }

    @Override
    public void updateTripByCodeTrip(String codeTrip, TripFormForUpdate formUpdateTour) {
        Tour tour=tourRepository.findByCodeTour(formUpdateTour.getTourCode());
        Trip trip = tripRepository.findByCodeTrip(codeTrip);
        trip.setTour(tour);
        trip = modelMapper.map(formUpdateTour, Trip.class);
        tripRepository.save(trip);
    }

    @Override
    public void updateTripNumberOfPassengersByCodeTrip(String codeTrip) {
        Trip trip = tripRepository.findByCodeTrip(codeTrip);
        trip.setNumberOfPassengers(trip.getNumberOfPassengers() - 1);
    }
}

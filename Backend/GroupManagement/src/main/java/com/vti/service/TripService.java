package com.vti.service;


import com.vti.dto.TripFormForCreate;
import com.vti.dto.TripFormForUpdate;

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

    @Override
    public void deleteByListCodeTrip(List<String> codeTrips) {

            tripRepository.deleteByListCodeTrip(codeTrips);

    }

//    @Override
//    public DetailTour getDetailTourByCodeTrip(String codeTrip) {
//        tripRepository.getDetailTourByCodeTrip(codeTrip);
//        return null;
//    }

    @Override
    public void saveTrip(TripFormForCreate tripFormForCreate) {
        if (tripFormForCreate.getCodeTrip() !=null){
        Tour tour=tourRepository.findByCodeTour(tripFormForCreate.getCodeTour());
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
        Trip trip = tripRepository.findByCodeTrip(codeTrip);
        System.out.println(trip.getCodeTrip());
        Tour tour=tourRepository.findByCodeTour(formUpdateTour.getCodeTour());

        trip.setPriceAdult(formUpdateTour.getPriceAdult());
        trip.setEndDate(formUpdateTour.getEndDate());
        trip.setStartDate(formUpdateTour.getStartDate());
        trip.setNumberOfPassengers(formUpdateTour.getNumberOfPassengers());
        trip.setNameGuide(formUpdateTour.getNameGuide());
        trip.setPhoneGuide(formUpdateTour.getPhoneGuide());
        if(formUpdateTour.getCodeTour()!=null){
            trip.setTour(tour);
//            trip = modelMapper.map(formUpdateTour, Trip.class);

        }
        tripRepository.save(trip);


    }

    @Override
    public void updateTripNumberOfPassengersByCodeTrip(String codeTrip,int numberOfBuy) {
        Trip trip = tripRepository.findByCodeTrip(codeTrip);
        if(numberOfBuy>trip.getNumberOfPassengers()){

        }
        else{
            trip.setNumberOfPassengers(trip.getNumberOfPassengers() -  numberOfBuy);

        }
    }
}

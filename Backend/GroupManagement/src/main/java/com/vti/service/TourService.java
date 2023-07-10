package com.vti.service;


import com.vti.dto.TourFormForCreate;
import com.vti.dto.TourFormForUpdate;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Tour;

import com.vti.repository.TourRepository;
import com.vti.specification.TourSpecificationBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TourService implements ITourService {
    @Autowired
    private TourRepository tourRespository;
    @Autowired
    private ModelMapper modelMapper;




    @Override
    public Page<Tour> getAllTours(Pageable pageable, TourFilter filter, String search) {
        TourSpecificationBuilder specification = new TourSpecificationBuilder(filter, search);

        return tourRespository.findAll(specification.build(), pageable);
    }

    @Override
    public Tour getTourByCode(String codeTour) {
        return tourRespository.findByCodeTour(codeTour);
    }

    @Override
    public void createTour(TourFormForCreate tourFormForCreate) {
        Tour tour = modelMapper.map(tourFormForCreate, Tour.class);
        tourRespository.save(tour);
    }

    @Override
    public void updateTour(String codeTour, TourFormForUpdate tourFormForUpdate) {
        Tour tour=tourRespository.findByCodeTour(codeTour);
        tour.setDescription(tourFormForUpdate.getDescription());
        tour.setDestination(tourFormForUpdate.getDestination());
        tour.setStartingGate(tourFormForUpdate.getStartingGate());
        tour.setTourTime(tourFormForUpdate.getTourTime());
        tour.setVehicle(tourFormForUpdate.getVehicle());
        tourRespository.save(tour);
    }

    @Override
    public void deleteTour(String codeTour) {
        tourRespository.deleteByCodeTour(codeTour);
    }

    @Override
    public boolean isTourExists(String codeTour) {
        return tourRespository.existsTourByCodeTour(codeTour);
    }
}

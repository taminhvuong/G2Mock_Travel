package com.vti.controller;

import com.vti.dto.*;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.DetailTour;
import com.vti.entity.Tour;
import com.vti.entity.Trip;
import com.vti.service.IDetailTourService;
import com.vti.service.TourService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/tours")
@CrossOrigin("*")
public class TourController {

    @Autowired
    private TourService tourService;
    @Autowired
    private IDetailTourService detailTourService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<?> getAllTours(
            Pageable pageable,
            TourFilter filter,
            @RequestParam(required = false)
                    String search) {
        Page<Tour> tours = tourService.getAllTours(pageable, filter, search);

        List<TourDTO> tourDtos = modelMapper.map(tours.getContent(), new TypeToken<List<TourDTO>>() {
        }.getType());
        Page<TourDTO> dtoPages = new PageImpl<>(tourDtos, pageable, tours.getTotalElements());
        return new ResponseEntity<>(dtoPages, HttpStatus.OK);
    }

    @GetMapping("/{codeTour}")
    public ResponseEntity<?> getTourByCode(@PathVariable("codeTour") String codeTour) {
        Tour tour = tourService.getTourByCode(codeTour);

        TourDTO tourDTO=modelMapper.map(tour,TourDTO.class);
        return new ResponseEntity<>(tourDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> createTour(@RequestBody TourFormForCreate tour) {
        tourService.createTour(tour);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping(value = "/getDetailTour/{codeTour}")
    public ResponseEntity<?> getDetailTour(@PathVariable(name = "codeTour") String codeTour) {
        DetailTour detailTour=detailTourService.getDetailTourByCodeTour(codeTour);
        List<DetailTourDto> detailTours = modelMapper.map(detailTour, new TypeToken<List<DetailTourDto>>() {
        }.getType());
        return new ResponseEntity<>(detailTours, HttpStatus.OK);
    }
    @PutMapping("/{codeTour}")
    public ResponseEntity<Void> updateTour(@PathVariable("codeTour") String codeTour, @RequestBody TourFormForUpdate tour) {
        tourService.updateTour(codeTour, tour);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{codeTour}")
    public ResponseEntity<Void> deleteTour(@PathVariable("codeTour") String codeTour) {
        tourService.deleteTour(codeTour);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

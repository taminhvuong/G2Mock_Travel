package com.vti.controller;

import com.vti.entity.Tour;
import com.vti.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/tours")
@CrossOrigin("*")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping
    public ResponseEntity<Page<Tour>> getAllTours(Pageable pageable) {
        Page<Tour> tours = tourService.getAllTours(pageable);
        return new ResponseEntity<>(tours, HttpStatus.OK);
    }

    @GetMapping("/{codeTour}")
    public ResponseEntity<Tour> getTourByCode(@PathVariable("codeTour") String codeTour) {
        Tour tour = tourService.getTourByCode(codeTour);
        return new ResponseEntity<>(tour, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> createTour(@RequestBody Tour tour) {
        tourService.createTour(tour);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{codeTour}")
    public ResponseEntity<Void> updateTour(@PathVariable("codeTour") String codeTour, @RequestBody Tour tour) {
        tourService.updateTour(codeTour, tour);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{codeTour}")
    public ResponseEntity<Void> deleteTour(@PathVariable("codeTour") String codeTour) {
        tourService.deleteTour(codeTour);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

package com.example.travel_mock2302.controller;

import com.example.travel_mock2302.dto.TourDto;
import com.example.travel_mock2302.dto.TripDto;
import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.entity.Trip;
import com.example.travel_mock2302.form.FormCreateTrip;
import com.example.travel_mock2302.form.FormUpdateTrip;
import com.example.travel_mock2302.service.TourService;
import com.example.travel_mock2302.service.TripService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/trip")
public class TripController {
    @Autowired
    private TripService tripService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<Trip> trips = tripService.findAll();
        List<TripDto> tripDtos = modelMapper.map(trips, new TypeToken<List<TripDto>>() {
        }.getType());
        return new ResponseEntity<>(tripDtos, HttpStatus.OK);
    }

    @PostMapping("/add")
    private ResponseEntity<?> saveTrip(FormCreateTrip formCreateTrip) {
        tripService.saveTrip(formCreateTrip);
        return new ResponseEntity<>("Sucess Add", HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateTrip(@PathVariable String codeTrip, FormUpdateTrip formUpdateTrip) {
        tripService.updateByCodeTrip(codeTrip, formUpdateTrip);
        return new ResponseEntity<>("Update", HttpStatus.OK);
    }
}

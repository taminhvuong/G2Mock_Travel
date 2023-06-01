package com.example.travel_mock2302.controller;

import com.example.travel_mock2302.dto.TourDto;
import com.example.travel_mock2302.entity.Tour;
import com.example.travel_mock2302.service.TourService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/tours")
public class TourController {
@Autowired
    private TourService tourService;
    @Autowired
    private ModelMapper modelMapper;
@GetMapping("")
    public ResponseEntity<?> findAll(){
    List<Tour> tours= tourService.findAll();
    List<TourDto> tourDtos=modelMapper.map(tours,new TypeToken<List<TourDto>>(){}.getType());
    return new ResponseEntity<>(tourDtos, HttpStatus.OK);
}
}

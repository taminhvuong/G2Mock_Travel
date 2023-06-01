package com.example.travel_mock2302.dto;

import lombok.Data;

@Data
public class TourDto {
    private String codeTour;


    private String startingGate;

    private String vehicle;

    private int numberOfPassengers;

    private String description;
}

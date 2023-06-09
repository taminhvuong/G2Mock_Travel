package com.vti.dto;

import lombok.Data;

@Data
public class TourFormForUpdate {

    private String startingGate;

    private String vehicle;

    private String description;

    private int tourTime;

    private String destination;
}

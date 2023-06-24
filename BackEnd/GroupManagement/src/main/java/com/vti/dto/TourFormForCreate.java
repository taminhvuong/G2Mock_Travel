package com.vti.dto;

import lombok.Data;

@Data
public class TourFormForCreate {
    private String codeTour;

    private String startingGate;

    private String vehicle;

    private String description;

    private int tourTime;

    private String destination;

}

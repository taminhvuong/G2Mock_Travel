package com.vti.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TripFormForCreate {
    private String codeTrip;

    private Date start_date;

    private Date end_date;

    private int numberOfPassengers;

    private float priceAdult ;

    private float priceChildren ;

    private float surcharge ;

    private int status;
    private int likeTrip;
    private String tourCode;
}

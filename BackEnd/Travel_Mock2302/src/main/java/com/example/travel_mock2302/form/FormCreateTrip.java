package com.example.travel_mock2302.form;

import lombok.Data;

import javax.persistence.Column;
import java.util.Date;
@Data
public class FormCreateTrip {
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

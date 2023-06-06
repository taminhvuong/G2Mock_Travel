package com.vti.dto;

import lombok.Data;

import javax.persistence.Column;
import java.util.Date;

@Data
public class BookingDto {

    private String fullName;

    private String phone;

    private String email;

    private String address;

    private int numberAdult;

    private int numberChildren;

    private Long  priceAll;

    private String codeTrip;

    private Date start_date;

    private Date end_date;

    private int numberOfPassengers;

    private float priceAdult ;

    private float priceChildren ;

    private float surcharge ;

}

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


    private Long  totalPrice;
    private String codeTrip;

    private Date startDate;

    private Date endDate;

    private int numberOfPassengers;

    private float priceAdult ;

    private float priceChildren ;

    private float surcharge ;

}

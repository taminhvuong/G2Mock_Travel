package com.vti.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDateTrip;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDateTrip;
    private String destination;
    private int numberOfPassengers;

    private float priceAdultTrip ;

    private float priceChildrenTrip ;

    private float surchargeTrip ;

}

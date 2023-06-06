package com.vti.dto;

import lombok.Data;

@Data
public class BookingFormForCreate {

    private String fullName;

    private String phone;

    private String email;

    private String address;

    private int numberAdult;

    private int numberChildren;



    private String codeTrip;
}

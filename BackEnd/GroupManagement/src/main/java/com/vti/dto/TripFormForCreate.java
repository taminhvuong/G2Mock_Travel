package com.vti.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class TripFormForCreate {
    private String codeTrip;
    @DateTimeFormat(pattern = "yyyy-MM-dd")

    private Date startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")

    private Date endDate;

    private int numberOfPassengers;

    private float priceAdult ;

    private float priceChildren ;

    private float surcharge ;

    private int status;
    private int likeTrip;
    private String nameGuide ;

    private String phoneGuide ;
    private String codeTour;
}

package com.vti.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
@Data
public class TripDto {
    private String codeTrip;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    private int numberOfPassengers;

    private float priceAdult ;

    private float priceChildren ;

    private float surcharge ;


    private String codeTour;
    private String destinationTour;
    private int timeTour;

}

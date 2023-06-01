package com.example.travel_mock2302.form;

import com.example.travel_mock2302.entity.DetailTour;
import com.example.travel_mock2302.entity.TourProvince;
import com.example.travel_mock2302.entity.Trip;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.Set;

@Data
public class FormCreateTour {
    private String codeTour;


    private String startingGate;

    private String vehicle;

    private int numberOfPassengers;

    private String description;

    private int tourTime;

    private String tripCode;


}

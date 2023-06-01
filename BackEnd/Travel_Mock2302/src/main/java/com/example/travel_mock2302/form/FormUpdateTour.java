package com.example.travel_mock2302.form;

import com.example.travel_mock2302.entity.Trip;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
@Data
public class FormUpdateTour {


        private String itineraryTour;

        private String startingGate;

        private String vehicle;

        private int numberOfPassengers;

        private String description;


    }



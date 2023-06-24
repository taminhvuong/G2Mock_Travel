package com.vti.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourDTO {
    private String codeTour;

    private String startingGate;

    private String vehicle;

    private String description;

    private int tourTime;

    private String img1 ;
    private String img2 ;
    private String img3 ;
    private String img4 ;
    private String destination;

}

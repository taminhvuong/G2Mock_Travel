package com.vti.dto;


import com.vti.entity.TourProvince;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String destination;

}

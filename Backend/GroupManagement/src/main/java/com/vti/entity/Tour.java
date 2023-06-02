package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
@Column( columnDefinition="varchar(50)")
    private String codeTour;
//    @Column(unique = true)
//    private String itineraryTour;
    @Column
    private String startingGate;
    @Column
    private String vehicle;

    @Column(columnDefinition="text")
    private String description;
    @Column
    private int tourTime;
    @OneToMany(mappedBy = "tour")
    private List<Trip> trips;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private Set<TourProvince> tourProvinces;
    @OneToMany(mappedBy = "tour")
    private List<DetailTour> detailTours;

}

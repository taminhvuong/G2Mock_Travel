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
    @Column (unique = true)
    private String destination;
    @Column
    private String vehicle;
    @Column
    private String img1 ;
    @Column
    private String img2 ;
    @Column
    private String img3 ;
    @Column
    private String img4 ;
    @Column(columnDefinition="text")
    private String description;
    @Column
    private int tourTime;
    @OneToMany(mappedBy = "tour")
    private List<Trip> trips;
    
   

}

package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    @Column(columnDefinition="varchar(50)")

    private String codeTrip;
    @Column
    private Date startDate;
    @Column
    private Date endDate;
    @Column(columnDefinition = "int unsigned")
    private int numberOfPassengers;
    @Column(columnDefinition = "int unsigned")
    private float priceAdult ;

    @Formula(" priceAdult / 100 *75")
    private float priceChildren;
    @Column(columnDefinition = "int unsigned")
    private float surcharge ;
    @Column
    private String hotel ;
    @Column
    private String nameGuide ;
    @Column
    private String phoneGuide ;
    @Column(columnDefinition = "bit default 1")
    private int status;

    @ManyToOne
    @JoinColumn(name = "codeTour",nullable = false)
    private Tour tour;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private Set<UserTrip> userTrips;
    @OneToMany(mappedBy = "trip")
    private List<Booking> bookings;
}

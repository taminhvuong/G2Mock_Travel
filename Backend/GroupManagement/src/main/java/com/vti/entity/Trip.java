package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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
    private Date start_date;
    @Column
    private Date end_date;
    @Column
    private int numberOfPassengers;
    @Column
    private float priceAdult ;

    @Formula(" priceAdult / 100 *75")
    private float priceChildren;
    @Column
    private float surcharge ;

    @Column(columnDefinition = "bit default 0")
    private int status;
    @Column(columnDefinition = "bit default 0")
    private int likeTrip;
    @ManyToOne
    @JoinColumn(name = "codeTour",nullable = false)
    private Tour tour;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @OneToMany(mappedBy = "trip")
    private List<Booking> bookings;
}

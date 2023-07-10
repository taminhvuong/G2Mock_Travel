package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String fullName;
    @Column
    private String phone;
    @Column
    private String email;
    @Column(columnDefinition="text")
    private String destination;
    @Column
    private String address;
    @Column
    private int numberAdult;
    @Column(columnDefinition = "bit default 0")
    private int  status;
    @Column
    private int numberChildren;
    @Column
//    @Formula(" priceAdult * trip.priceAdult + numberChildren * trip.priceChildren")
    private Long  totalPrice;
    @ManyToOne
    @JoinColumn(name = "userId",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "codeTrip",nullable = false)
    private Trip trip;
}

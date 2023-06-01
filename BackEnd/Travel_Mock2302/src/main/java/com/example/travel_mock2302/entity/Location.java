package com.example.travel_mock2302.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String nameLocation;
    @ManyToOne
    @JoinColumn(name = "province_id",nullable = false)
    private Province province;
}

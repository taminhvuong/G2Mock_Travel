package com.example.travel_mock2302.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Data
@NoArgsConstructor
public class Province {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        @Column
        private String nameProvince;
        @OneToMany(mappedBy = "province")
        private List<Location> locations;
        @OneToMany(mappedBy = "province")
        private Set<TourProvince> tourProvinces;
        }

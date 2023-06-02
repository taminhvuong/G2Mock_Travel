package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailTour {
    @Id
    @GeneratedValue (strategy =GenerationType.IDENTITY)
    private int id;
    @Column
    private String Date;
    @Column(columnDefinition = "text")
    private String description;
    @ManyToOne
    @JoinColumn(name = "codeTour",nullable = false)
    private Tour tour;
}

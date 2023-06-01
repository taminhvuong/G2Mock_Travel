package com.example.travel_mock2302.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class UserTripId implements Serializable {
    @Column(name = "trip_code",columnDefinition="varchar(50)")
    private String tripCode;

    @Column(name = "user_id" )

    private Long userId;
}

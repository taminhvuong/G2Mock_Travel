package com.example.travel_mock2302.entity;

import lombok.*;

import javax.persistence.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class UserTrip {
    @EmbeddedId
    private UserTripId id;

    @MapsId("tripCode")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_code")
    private Trip trip;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}

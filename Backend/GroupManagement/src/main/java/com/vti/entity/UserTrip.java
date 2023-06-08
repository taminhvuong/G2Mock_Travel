package com.vti.entity;

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

     @Column(columnDefinition = "bit default 0")
     private int likeTrip;
}

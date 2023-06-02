package com.vti.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TourProvince {
@EmbeddedId
private TourProvinceId id;

    @MapsId("tourCode")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_code")
    private Tour tour;

    @MapsId("provinceId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id")
    private Province province;
}

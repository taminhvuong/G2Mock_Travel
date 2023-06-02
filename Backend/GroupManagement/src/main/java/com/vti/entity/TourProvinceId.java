package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TourProvinceId implements Serializable {
    @Column(name = "tour_code",columnDefinition="varchar(50)")
    private String tourCode;

    @Column(name = "province_id")
    private int provinceId;
}

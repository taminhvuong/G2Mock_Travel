package com.vti.service;

import com.vti.entity.DetailTour;
import com.vti.repository.DetailTourResponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetailTourService implements IDetailTourService {
    @Autowired
    private DetailTourResponsitory responsitory;
    @Override
    public DetailTour getDetailTourByCodeTrip(String codeTrip) {
        responsitory.getDetailTourByCodeTrip(codeTrip);
        return null;
    }
}

package com.vti.specification;

import com.vti.entity.Booking;
import com.vti.entity.Trip;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class BookingSpecification implements Specification<Booking> {

    private static final long serialVersionUID = 1L;
    private SearchCriteria criteria;

    public BookingSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }



    @Override
    public Predicate toPredicate(Root<Booking> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        if (criteria.getOperator().equalsIgnoreCase("Like")) {
            return criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
        }

        if (criteria.getOperator().equalsIgnoreCase(">=")) {
            return criteriaBuilder.greaterThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString());
        }

        if (criteria.getOperator().equalsIgnoreCase("<=")) {
            return criteriaBuilder.lessThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString());
        }

        return null;
    }
}
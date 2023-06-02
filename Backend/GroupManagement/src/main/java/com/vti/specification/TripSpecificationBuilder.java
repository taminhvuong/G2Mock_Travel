package com.vti.specification;

import com.vti.dto.filter.TripFilter;
import com.vti.entity.Trip;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class TripSpecificationBuilder {

	private TripFilter filter;
	private String search;

	public TripSpecificationBuilder(TripFilter filter, String search) {
		this.filter = filter;
		this.search = search;
	}

	@SuppressWarnings("deprecation")
	public Specification<Trip> build() {

		SearchCriteria seachCriteria = new SearchCriteria("codeTrip", "Like", search);
//		SearchCriteria minTotalMemberCriteria = new SearchCriteria("totalMember", ">=", filter.getMinTotalMember());
//		SearchCriteria maxTotalMemberCriteria = new SearchCriteria("totalMember", "<=", filter.getMaxTotalMember());

		Specification<Trip> where = null;

		// search
		if (!StringUtils.isEmpty(search)) {
			where = new TripSpecification(seachCriteria);
		}

		// min totalMember filter
//		if (filter.getMinTotalMember() != 0) {
//			if (where != null) {
//				where = where.and(new TripSpecification(minTotalMemberCriteria));
//			} else {
//				where = new TripSpecification(minTotalMemberCriteria);
//			}
//		}
//
//		// max totalMember filter
//		if (filter.getMaxTotalMember() != 0) {
//			if (where != null) {
//				where = where.and(new TripSpecification(maxTotalMemberCriteria));
//			} else {
//				where = new TripSpecification(maxTotalMemberCriteria);
//			}
//		}

		return where;
	}
}

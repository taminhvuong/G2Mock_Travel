package com.vti.specification;

import com.vti.dto.filter.TourFilter;
import org.springframework.util.StringUtils;

public class TourSpecificationBuilder {
    private TourFilter filter;
    private String search;

    public TourSpecificationBuilder(TourFilter filter, String search) {
        this.filter = filter;
        this.search = search;
    }

    @SuppressWarnings("deprecation")
    public TourSpecification build() {

        SearchCriteria seachCriteria = new SearchCriteria("destination", "Like", search);

        TourSpecification where = null;

        // search
        if (!StringUtils.isEmpty(search)) {
            where = new TourSpecification(seachCriteria);
        }

            return where;
    }
}

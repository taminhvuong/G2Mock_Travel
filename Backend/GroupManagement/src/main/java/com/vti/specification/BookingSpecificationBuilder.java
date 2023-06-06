package com.vti.specification;

import com.vti.dto.filter.BookingFilter;
import org.springframework.util.StringUtils;

public class BookingSpecificationBuilder {
    private BookingFilter filter;
    private String search;

    public BookingSpecificationBuilder(BookingFilter filter, String search) {
        this.filter = filter;
        this.search = search;
    }

    @SuppressWarnings("deprecation")
    public BookingSpecification build() {

        SearchCriteria seachCriteria = new SearchCriteria("fullName", "Like", search);

        BookingSpecification where = null;

        // search
        if (!StringUtils.isEmpty(search)) {
            where = new BookingSpecification(seachCriteria);
        }

            return where;
    }
}

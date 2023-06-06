package com.vti.service;

import com.vti.dto.BookingFormForCreate;
import com.vti.dto.BookingFormForUpdate;
import com.vti.dto.filter.BookingFilter;
import com.vti.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IBookingService {

    public Page<Booking> findAll(Pageable pageable, BookingFilter filter, String search);
    public Booking findBookingById(int id);
    public  void deleteBookingById(int id);
    public void saveBooking (BookingFormForCreate bookingFormForCreate);

    public  void updateBookingById(int id, BookingFormForUpdate bookingFormForUpdate);


}

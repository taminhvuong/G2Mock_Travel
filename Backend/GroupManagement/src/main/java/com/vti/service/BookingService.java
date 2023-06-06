package com.vti.service;

import com.vti.dto.BookingFormForCreate;
import com.vti.dto.BookingFormForUpdate;
import com.vti.dto.filter.BookingFilter;
import com.vti.entity.Booking;
import com.vti.entity.Trip;
import com.vti.repository.BookingRespository;
import com.vti.repository.TripRepository;
import com.vti.specification.BookingSpecificationBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRespository bookingRespository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private TripService tripService;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Page<Booking> findAll(Pageable pageable, BookingFilter filter, String search) {
        BookingSpecificationBuilder specification = new BookingSpecificationBuilder(filter, search);

        return bookingRespository.findAll(specification.build(), pageable);
    }

    @Override
    public Booking findBookingById(int id) {
        return bookingRespository.findById(id);

    }

    @Override
    public void deleteBookingById(int id) {
        bookingRespository.deleteById(id);
    }

    @Override
    public void saveBooking(BookingFormForCreate bookingFormForCreate) {
        Trip trip=tripRepository.findByCodeTrip(bookingFormForCreate.getCodeTrip());
        Booking booking = modelMapper.map(bookingFormForCreate, Booking.class);
        booking.setTrip(trip);
        tripService.updateTripNumberOfPassengersByCodeTrip(trip.getCodeTrip());
        bookingRespository.save(booking);
    }

    @Override
    public void updateBookingById(int id, BookingFormForUpdate bookingFormForUpdate) {
        Booking booking=bookingRespository.findById(id);
        booking.setFullName(bookingFormForUpdate.getFullName());
        booking = modelMapper.map(bookingFormForUpdate, Booking.class);

        bookingRespository.save(booking);
    }


}

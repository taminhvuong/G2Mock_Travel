package com.vti.service;

import com.vti.dto.BookingFormForCreate;
import com.vti.dto.BookingFormForUpdate;
import com.vti.dto.filter.BookingFilter;
import com.vti.entity.Booking;
import com.vti.entity.Trip;
import com.vti.entity.User;
import com.vti.repository.BookingRespository;
import com.vti.repository.TripRepository;
import com.vti.repository.UserRepository;
import com.vti.specification.BookingSpecificationBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRespository bookingRespository;
    @Autowired
    private UserRepository userRepository;
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
    public List<Booking> findByUser(String userName ,int status) {

        return bookingRespository.findByUser(userName,status);
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
        Trip trip = tripRepository.findByCodeTrip(bookingFormForCreate.getCodeTrip());
        Booking booking = modelMapper.map(bookingFormForCreate, Booking.class);
        User user = userRepository.findByUserName(bookingFormForCreate.getNameUser());
        if (bookingFormForCreate.getCodeTrip() != null) {
            booking.setTrip(trip);
            booking.setUser(user);
            float priceBooking= (trip.getPriceAdult()* bookingFormForCreate.getNumberAdult()+ trip.getPriceChildren()* bookingFormForCreate.getNumberAdult()+trip.getSurcharge());
            booking.setTotalPrice((long) priceBooking);
        }
        int numberOfBuy = bookingFormForCreate.getNumberAdult() + bookingFormForCreate.getNumberChildren();
        tripService.updateTripNumberOfPassengersByCodeTrip(trip.getCodeTrip(), numberOfBuy);
        bookingRespository.save(booking);
    }

    @Override
    public void updateBookingById(int id, BookingFormForUpdate bookingFormForUpdate) {
        Booking booking = bookingRespository.findById(id);
        booking.setFullName(bookingFormForUpdate.getFullName());
        booking = modelMapper.map(bookingFormForUpdate, Booking.class);

        bookingRespository.save(booking);
    }


}

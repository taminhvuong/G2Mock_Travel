package com.vti.controller;

import com.vti.dto.*;
import com.vti.dto.filter.BookingFilter;
import com.vti.dto.filter.TripFilter;
import com.vti.entity.Booking;
import com.vti.entity.Trip;
import com.vti.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/bookings")

public class BookingController {
    @Autowired
    private BookingService service;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping()
    public ResponseEntity<?> getAllBookings(
            Pageable pageable,
            BookingFilter filter,
            @RequestParam(required = false)
                    String search) {
        Page<Booking> bookings = service.findAll(pageable, filter, search);


        List<BookingDto> bookingDtos = modelMapper.map(bookings.getContent(), new TypeToken<List<BookingDto>>() {
        }.getType());
        Page<BookingDto> dtoPages = new PageImpl<>(bookingDtos, pageable, bookings.getTotalElements());
        return new ResponseEntity<>(dtoPages, HttpStatus.OK);
    }



    @PostMapping("/save")
    public ResponseEntity<?> createBooking(@RequestBody BookingFormForCreate form) {
        service.saveBooking(form);
        return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable(name = "id") int id) {
        return new ResponseEntity<>(service.findBookingById(id), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable(name = "codeTrip") int id,
                                         @RequestBody BookingFormForUpdate form) {
        service.updateBookingById(id, form);
        return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable("id") int id) {
        service.deleteBookingById(id);
        return new ResponseEntity<>("Delete successfully",HttpStatus.OK);
    }

}

package com.vti.controller;

import com.vti.dto.TripFormForCreate;
import com.vti.dto.TripFormForUpdate;
import com.vti.dto.TripDto;
import com.vti.dto.filter.TripFilter;
import com.vti.entity.Trip;
import com.vti.service.ITripService;
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
@RequestMapping(value = "api/v1/trips")
@CrossOrigin("*")

public class TripController {

    @Autowired
    private ITripService service;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public ResponseEntity<?> getAllTrips(
            Pageable pageable,
            TripFilter filter,
            @RequestParam(required = false)
                    String search) {
        Page<Trip> trips = service.findAll(pageable, filter, search);

        List<TripDto> tripDtos = modelMapper.map(trips.getContent(), new TypeToken<List<TripDto>>() {
        }.getType());
        Page<TripDto> dtoPages = new PageImpl<>(tripDtos, pageable, trips.getTotalElements());
        return new ResponseEntity<>(dtoPages, HttpStatus.OK);
    }

    @GetMapping(value = "/codeTrip/{codeTrip}")
    public ResponseEntity<?> existsTripByCodeTrip(@PathVariable(name = "codeTrip") String codeTrip) {
        return new ResponseEntity<>(service.existsTripByCodeTrip(codeTrip), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createTrip(@RequestBody TripFormForCreate form) {
        service.saveTrip(form);
        return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
    }

    @GetMapping(value = "/{codeTrip}")
    public ResponseEntity<?> getTripByCodeTrip(@PathVariable(name = "codeTrip") String codeTrip) {
        Trip trip=service.findByCodeTrip(codeTrip);
        TripDto tripDto=modelMapper.map(trip,TripDto.class);
        return new ResponseEntity<>(tripDto, HttpStatus.OK);
    }

    @PutMapping(value = "/{codeTrip}")
    public ResponseEntity<?> updateTrip(@PathVariable(name = "codeTrip") String codeTrip,
                                         @RequestBody TripFormForUpdate form) {
        service.updateTripByCodeTrip(codeTrip, form);
        return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
    }
    @DeleteMapping("/{codeTrip}")
    public ResponseEntity<?> deleteTrip(@PathVariable("codeTrip") String codeTrip) {
        service.deleteByCodeTrip(codeTrip);
        return new ResponseEntity<>("Delete successfully",HttpStatus.OK);
    }

	@DeleteMapping(value = "/deleteList/{codeTrips}")
	public ResponseEntity<?> deleteGroups(@PathVariable(name = "codeTrips") List<String> codeTrips) {
		service.deleteByListCodeTrip(codeTrips);
		return new ResponseEntity<String>("Delete trips successfully!", HttpStatus.OK);
	}
}

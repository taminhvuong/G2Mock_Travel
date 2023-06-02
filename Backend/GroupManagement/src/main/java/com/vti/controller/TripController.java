package com.vti.controller;

import com.vti.dto.FormCreateTrip;
import com.vti.dto.FormUpdateTrip;
import com.vti.dto.filter.TripFilter;
import com.vti.entity.Trip;
import com.vti.service.ITripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/groups")
public class TripController {

	@Autowired
	private ITripService service;

	@GetMapping()
	public ResponseEntity<?> getAllGroups(
			Pageable pageable, 
			TripFilter filter,
			@RequestParam(required = false) 
			String search) {
		Page<Trip> entities = service.findAll(pageable, filter, search);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

//	@GetMapping(value = "/name/{name}")
//	public ResponseEntity<?> existsGroupByName(@PathVariable(name = "name") String name) {
//		return new ResponseEntity<>(service.isGroupExistsByName(name), HttpStatus.OK);
//	}

	@PostMapping()
	public ResponseEntity<?> createGroup(@RequestBody FormCreateTrip form) {
		service.saveTrip(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getGroupByID(@PathVariable(name = "id") String codeTrip) {
		return new ResponseEntity<>(service.findByCodeTrip(codeTrip), HttpStatus.OK);
	}

	@PutMapping(value = "/{codeTrip}")
	public ResponseEntity<?> updateGroup(@PathVariable(name = "codeTrip") String codeTrip, @RequestBody FormUpdateTrip form) {
		service.updateByCodeTrip(codeTrip, form);
		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
	}

//	@DeleteMapping(value = "/{ids}")
//	public ResponseEntity<?> deleteGroups(@PathVariable(name = "ids") List<Short> ids) {
//		service.deleteGroups(ids);
//		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
//	}
}

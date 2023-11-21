package edu.codespring.ro.biomap.controller;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.incoming.CreationLocationDto;
import edu.codespring.ro.biomap.dto.outgoing.LocationDto;
import edu.codespring.ro.biomap.mapper.LocationMapper;
import edu.codespring.ro.biomap.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    private final LocationService locationService;
    private final LocationMapper locationMapper;

    //@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SCIENTIST')")
    @GetMapping
    public List<LocationDto> findAll() throws NotFoundException {
        log.info("Returning all locations");
        try {
            return locationMapper.modelsToDtos(locationService.findAll());
        } catch (NotFoundException e) {
            log.debug("Not Found Error", e);
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SCIENTIST')")
    @GetMapping("/{id}")
    public LocationDto findById(@PathVariable(value = "id") Integer locationId) throws NotFoundException {
        log.info("Returning location by id {}", locationId);
        try {
            return locationMapper.modelToDto(locationService.findById(locationId));
        } catch (NotFoundException e) {
            log.debug("Could not find location with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @GetMapping("/countries/{id}")
    public List<LocationDto> findByCountryId(@PathVariable(value = "id") Integer locationId) throws NotFoundException {
        log.info("Returning location by id {}", locationId);
        try {
            return locationMapper.modelsToDtos(locationService.findByCountryId(locationId));
        } catch (NotFoundException e) {
            log.debug("Could not find location with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public LocationDto create(@RequestBody CreationLocationDto location) throws BadRequestException {
        return locationMapper.modelToDto(locationService.create(locationMapper.creationDtoToModel(location)));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public void update(@RequestBody CreationLocationDto updatedLocation, @PathVariable(value = "id") Integer locationId)
            throws NotFoundException {
        log.info("Updating location with id {}", locationId);
        try {
            locationService.update(locationId, locationMapper.creationDtoToModel(updatedLocation));
            log.info("Location with id {} has been successfully updated", locationId);
        } catch (NotFoundException e) {
            log.debug("Could not find and update location with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(value = "id") Integer locationId) throws NotFoundException {
        log.info("Deleting location by id {}", locationId);
        try {
            locationService.delete(locationId);
            log.info("Location with id {} has been successfully deleted", locationId);
        } catch (NotFoundException e) {
            log.debug("Could not find and delete location with requested id {}", e.getRequestedId());
            throw e;
        }
    }

}

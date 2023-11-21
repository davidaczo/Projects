package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.model.Location;
import edu.codespring.ro.biomap.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public Location create(Location location) {
        location.setActive(true);
        return locationRepository.save(location);
    }

    public Location update(Integer id, Location location) {
        if (locationRepository.existsById(id)) {
            location.setLocationId(id);
            return locationRepository.save(location);
        } else {
            throw new NotFoundException(id);
        }
    }

    public void delete(Integer id) {
        if (locationRepository.existsById(id)) {
            locationRepository.delete(locationRepository.getById(id));
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    public Location findById(Integer id) {
        if (locationRepository.existsById(id)) {
            return locationRepository.getById(id);
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<Location> findByCountryId(Integer countryId) {
        List<Location> locations = locationRepository.findLocationsByActiveIsTrue();
        List<Location> locationsInCountry = new ArrayList<>();
        for (Location location:locations) {
            if (location.getCountry().getCountryId().equals(countryId)) {
                locationsInCountry.add(location);
            }
        }
        return locationsInCountry;
    }
}

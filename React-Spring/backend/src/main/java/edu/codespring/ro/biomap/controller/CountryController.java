package edu.codespring.ro.biomap.controller;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.incoming.CreationCountryDto;
import edu.codespring.ro.biomap.dto.outgoing.CountryDto;
import edu.codespring.ro.biomap.mapper.CountryMapper;
import edu.codespring.ro.biomap.service.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService countryService;
    private final CountryMapper countryMapper;
    
    @GetMapping
    public List<CountryDto> findAll(Authentication authentication) throws NotFoundException {
        log.info("Returning all countries");
        try {
            return countryMapper.modelsToDtos(countryService.findAll());
        } catch (NotFoundException e) {
            log.debug("Not Found Error", e);
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SCIENTIST')")
    @GetMapping("/{id}")
    public CountryDto findById(@PathVariable(value = "id") Integer countryId) throws NotFoundException {
        log.info("Returning country by id {}", countryId);
        try {
            return countryMapper.modelToDto(countryService.findById(countryId));
        } catch (NotFoundException e) {
            log.debug("Could not find country with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public CountryDto create(@RequestBody CreationCountryDto countries) throws BadRequestException {
        return countryMapper.modelToDto(countryService.create(countryMapper.creationDtoToModel(countries)));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public void update(@RequestBody CreationCountryDto updatedCountry, @PathVariable(value = "id") Integer countryId)
            throws NotFoundException {
        log.info("Updating country with id {}", countryId);
        try {
            countryService.update(countryId, countryMapper.creationDtoToModel(updatedCountry));
            log.info("Country with id {} has been successfully updated", countryId);
        } catch (NotFoundException e) {
            log.debug("Could not find and update country with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(value = "id") Integer countryId) throws NotFoundException {
        log.info("Deleting country by id {}", countryId);
        try {
            countryService.delete(countryId);
            log.info("Country with id {} has been successfully deleted", countryId);
        } catch (NotFoundException e) {
            log.debug("Could not find and delete country with requested id {}", e.getRequestedId());
            throw e;
        }
    }

}

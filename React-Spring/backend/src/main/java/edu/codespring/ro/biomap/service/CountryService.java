package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.model.Country;
import edu.codespring.ro.biomap.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public Country create(Country country) {
        return countryRepository.save(country);
    }

    public Country update(Integer id, Country country) {
        if (countryRepository.existsById(id)) {
            country.setCountryId(id);
            return countryRepository.save(country);
        } else {
            throw new NotFoundException(id);
        }
    }

    public void delete(Integer id) {
        if (countryRepository.existsById(id)) {
            countryRepository.delete(countryRepository.getById(id));
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    public Country findById(Integer id) {
        if (countryRepository.existsById(id)) {
            return countryRepository.getById(id);
        } else {
            throw new NotFoundException(id);
        }
    }

}

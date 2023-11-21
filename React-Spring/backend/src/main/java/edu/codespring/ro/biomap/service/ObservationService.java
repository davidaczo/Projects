package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.incoming.FilterObservationDto;
import edu.codespring.ro.biomap.model.Location;
import edu.codespring.ro.biomap.model.Observation;
import edu.codespring.ro.biomap.model.Species;
import edu.codespring.ro.biomap.model.User;
import edu.codespring.ro.biomap.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ObservationService {

    private final ObservationRepository observationRepository;

    private final ObservationDao observationDao;

    private final UserRepository userRepository;

    private final SpeciesRepository speciesRepository;

    private final LocationRepository locationRepository;

    private void setUser(Observation observation) {
        if (userRepository.existsById(observation.getUploader().getUserId())) {
            User uploader = userRepository.findById(observation.getUploader().getUserId()).get();
            observation.setUploader(uploader);
        } else {
            throw new BadRequestException("No such user exists!");
        }
    }

    private void setSpecies(Observation observation) {
        if (speciesRepository.existsById(observation.getSpecies().getSpeciesId())) {
            Species species = speciesRepository.findById(observation.getSpecies().getSpeciesId()).get();
            observation.setSpecies(species);
        } else {
            throw new BadRequestException("No such species exists!");
        }
    }

    private void setLocation(Observation observation) {
        if (observation.getLocation() != null) {
            if (locationRepository.existsById(observation.getLocation().getLocationId())) {
                Location location = locationRepository.findById(observation.getLocation().getLocationId()).get();
                observation.setLocation(location);
            } else {
                throw new BadRequestException("No such location exists!");
            }
        }
    }

    public Observation create(Observation observation) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        if ((observation.getDate().isAfter(today))
                || observation.getDate().equals(today) && observation.getTime().isAfter(now)) {
            throw new BadRequestException("Date is not allowed to be in the future!");
        }
        setUser(observation);
        setSpecies(observation);
        setLocation(observation);
        observation.setActive(true);
        return observationRepository.save(observation);
    }

    public Observation update(Observation observation) {
        if (observation.getSpecies() != null) {
            setSpecies(observation);
        }
        if (observation.getLocation() != null) {
            setLocation(observation);
        }
        return observationRepository.save(observation);
    }

    public void delete(Integer id) {
        if (observationRepository.existsById(id)) {
            Observation observation = observationRepository.getById(id);
            observation.setActive(false);
            observationRepository.save(observation);
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<Observation> findAll() {
        return observationRepository.findObservationsByActiveIsTrue();
    }

    public Observation findById(Integer id) {
        if (observationRepository.existsById(id)) {
            Observation observation = observationRepository.getById(id);
            if (observation.getActive()) {
                return observation;
            } else {
                throw new NotFoundException(id);
            }
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<Observation> filter(FilterObservationDto filterObservationDto) {
        if (!(filterObservationDto.getDateFrom() == null && filterObservationDto.getDateTo() == null
                && filterObservationDto.getMonthFrom() == null && filterObservationDto.getMonthTo() == null)) {
            if ((filterObservationDto.getDateFrom() != null || filterObservationDto.getDateTo() != null)
                    && (filterObservationDto.getMonthFrom() != null || filterObservationDto.getMonthTo() != null)) {
                throw new BadRequestException("Only one date type can be provided!");
            }
            if (filterObservationDto.getDateFrom() != null && filterObservationDto.getDateTo() != null
                    && filterObservationDto.getDateTo().compareTo(filterObservationDto.getDateFrom()) < 0) {
                throw new BadRequestException("Incorrect date interval!");
            }
            if ((filterObservationDto.getMonthFrom() == null || filterObservationDto.getMonthTo() == null)
                    && filterObservationDto.getDateFrom() == null) {
                throw new BadRequestException("Missing range value!");
            }
        }
        return observationDao.filter(filterObservationDto);
    }

    public List<Observation> findByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow(
                () -> new BadRequestException("Such a user doesn't exist!")
        );
        return observationRepository.findObservationsByUploaderAndActiveIsTrue(user);
    }

}

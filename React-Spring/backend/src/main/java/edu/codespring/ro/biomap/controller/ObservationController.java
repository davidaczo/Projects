package edu.codespring.ro.biomap.controller;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.incoming.CreationObservationDto;
import edu.codespring.ro.biomap.dto.incoming.FilterObservationDto;
import edu.codespring.ro.biomap.dto.incoming.UpdateObservationDto;
import edu.codespring.ro.biomap.dto.outgoing.ObservationDto;
import edu.codespring.ro.biomap.mapper.ObservationMapper;
import edu.codespring.ro.biomap.model.Observation;
import edu.codespring.ro.biomap.service.ObservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.io.ParseException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/observations")
public class ObservationController {

    private final ObservationService observationService;
    private final ObservationMapper observationMapper;

    @GetMapping()
    public List<ObservationDto> findAll() {
        return observationMapper.modelsToDtos(observationService.findAll());
    }

    @GetMapping("/filter")
    public List<ObservationDto> filter(FilterObservationDto filterObservationDto) {
        return observationMapper.modelsToDtos(observationService.filter(filterObservationDto));
    }

    @GetMapping("/{id}")
    public ObservationDto findById(@PathVariable("id") Integer id) {
        try {
            return observationMapper.modelToDto(observationService.findById(id));
        } catch (NotFoundException e) {
            throw e;
        }
    }

    @PostMapping()
    public ObservationDto create(@Valid @RequestBody CreationObservationDto creationObservationDto)
            throws ParseException {
        Observation observation = observationMapper.creationDtoToModel(creationObservationDto);
        try {
            observation = observationService.create(observation);
            ObservationDto observationDto = observationMapper.modelToDto(observation);
            return observationDto;
        } catch (BadRequestException e) {
            log.info(String.valueOf(e));
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('SCENTIST')")
    @PatchMapping("/{id}")
    public ObservationDto update(@PathVariable("id") Integer id,
                                  @RequestBody UpdateObservationDto updateObservationDto) {
        try {
            Observation observation = observationService.findById(id);
            observation = observationMapper.updateDtoToModel(updateObservationDto, observation);
            observation = observationMapper.updateNewIds(updateObservationDto, observation);
            observation = observationService.update(observation);
            return observationMapper.modelToDto(observation);
        } catch (NotFoundException e) {
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('SCENTIST') or hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        observationService.delete(id);
    }

}

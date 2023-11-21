package edu.codespring.ro.biomap.controller;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.incoming.CreationSpeciesDto;
import edu.codespring.ro.biomap.dto.outgoing.SpeciesDto;
import edu.codespring.ro.biomap.mapper.SpeciesMapper;
import edu.codespring.ro.biomap.service.SpeciesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/species")
public class SpeciesController {

    final SpeciesService speciesService;
    final SpeciesMapper speciesMapper;

    @GetMapping
    public List<SpeciesDto> findAll() throws NotFoundException {
        log.info("Returning all species");
        try {
            return speciesMapper.modelsToDtos(speciesService.findAll());
        } catch (NotFoundException e) {
            log.debug("Not Found Error", e);
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('SCIENTIST') or hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public SpeciesDto findById(@PathVariable(value = "id") Integer speciesId) throws NotFoundException {
        log.info("Returning species by id {}", speciesId);
        try {
            return speciesMapper.modelToDto(speciesService.findById(speciesId));
        } catch (NotFoundException e) {
            log.debug("Could not find species with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @GetMapping("/upload-search")
    public List<SpeciesDto> findAllByNameLikeUpload(@RequestParam("search") String search) {
        return speciesMapper.modelsToDtos(speciesService.findAllByNameLikeUpload(search));
    }

    @GetMapping("/search")
    public List<String> findAllByNameLike(@RequestParam("search") String search) {
        return speciesService.findAllByNameLike(search);
    }

    @PreAuthorize("hasAuthority('SCIENTIST')")
    @PostMapping
    public SpeciesDto create(@RequestBody CreationSpeciesDto species) throws BadRequestException {
        return speciesMapper.modelToDto(speciesService.create(speciesMapper.creationDtoToModel(species)));
    }

    @PreAuthorize("hasAuthority('SCIENTIST')")
    @PutMapping("/{id}")
    public void update(@RequestBody CreationSpeciesDto updatedSpecies, @PathVariable(value = "id") Integer speciesId)
            throws NotFoundException {
        log.info("Updating species with id {}", speciesId);
        try {
            speciesService.update(speciesId, speciesMapper.creationDtoToModel(updatedSpecies));
            log.info("Species with id {} has been successfully updated", speciesId);
        } catch (NotFoundException e) {
            log.debug("Could not find and update species with requested id {}", e.getRequestedId());
            throw e;
        }
    }

    @PreAuthorize("hasAuthority('SCIENTIST')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(value = "id") Integer speciesId) throws NotFoundException {
        log.info("Deleting species by id {}", speciesId);
        try {
            speciesService.delete(speciesId);
            log.info("Species with id {} has been successfully deleted", speciesId);
        } catch (NotFoundException e) {
            log.debug("Could not find and delete species with requested id {}", e.getRequestedId());
            throw e;
        }
    }
}

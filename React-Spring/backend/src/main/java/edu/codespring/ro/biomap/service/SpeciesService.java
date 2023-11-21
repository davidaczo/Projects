package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.outgoing.SpeciesDto;
import edu.codespring.ro.biomap.model.Species;
import edu.codespring.ro.biomap.repository.SpeciesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SpeciesService {

    private final SpeciesRepository speciesRepository;

    public Species create(Species species) {
        if (species.getNameCommon() == null && species.getNameLatin() == null) {
            throw new BadRequestException("Species creation failed: at least one name should be specified!");
        }
        return speciesRepository.save(species);
    }

    public Species update(Integer id, Species species) {
        if (speciesRepository.existsById(id)) {
            species.setSpeciesId(id);
            return speciesRepository.save(species);
        } else {
            throw new NotFoundException(id);
        }
    }

    public void delete(Integer id) {
        if (speciesRepository.existsById(id)) {
            speciesRepository.delete(speciesRepository.getById(id));
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<Species> findAll() {
        return speciesRepository.findAll();
    }

    public Species findById(Integer id) {
        if (speciesRepository.existsById(id)) {
            return speciesRepository.getById(id);
        } else {
            throw new NotFoundException(id);
        }
    }

    public List<String> findAllByNameLike(String search) {
        if (search.length() >= 3) {
            List<String> matchNameCommon = speciesRepository.findSpeciesByNameCommonStartingWith(search);
            List<String> matchNameLatin = speciesRepository.findSpeciesByNameLatinStartingWith(search);
            matchNameCommon.addAll(matchNameLatin);
            return matchNameCommon;
        }
        return Collections.emptyList();
    }

    public List<Species> findAllByNameLikeUpload(String search) {
        if (search.length() >= 3) {
            return (List<Species>) speciesRepository.findAllSpeciesByNameCommon(search);
        }
        return Collections.emptyList();
    }

}

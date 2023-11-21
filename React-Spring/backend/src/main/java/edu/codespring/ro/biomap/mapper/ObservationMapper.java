package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationObservationDto;
import edu.codespring.ro.biomap.dto.incoming.UpdateObservationDto;
import edu.codespring.ro.biomap.dto.outgoing.ObservationDto;
import edu.codespring.ro.biomap.model.Location;
import edu.codespring.ro.biomap.model.Observation;
import edu.codespring.ro.biomap.model.Species;
import edu.codespring.ro.biomap.model.User;
import edu.codespring.ro.biomap.service.SpeciesService;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ObservationMapper {

    public abstract ObservationDto modelToDto(Observation observation);

    public abstract List<ObservationDto> modelsToDtos(List<Observation> observations);

    public Observation creationDtoToModel(CreationObservationDto creationObservationDto) throws ParseException {
        Observation observation = new Observation(
                null, new Species(), new User(), null, null,
                creationObservationDto.getDevelopement(),
                creationObservationDto.getDate(),
                creationObservationDto.getTime(),
                new WKTReader().read(creationObservationDto.getGeometry()),
                creationObservationDto.getStatus(),
                creationObservationDto.getComment(),
                creationObservationDto.getNumber(),
                null
        );
        observation.getSpecies().setSpeciesId(creationObservationDto.getSpeciesId());
        observation.getUploader().setUserId(creationObservationDto.getUploaderId());
        if (creationObservationDto.getLocationId() != null) {
            observation.setLocation(new Location());
            observation.getLocation().setLocationId(creationObservationDto.getLocationId());
        }
        return observation;
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract Observation updateDtoToModel(
            UpdateObservationDto observationDto, @MappingTarget Observation observation
    );

    public Observation updateNewIds(UpdateObservationDto updateObservationDto, Observation observation) {
        if (updateObservationDto.getSpeciesId() != null) {
            observation.setSpecies(new Species());
            observation.getSpecies().setSpeciesId(updateObservationDto.getSpeciesId());
        }
        if (updateObservationDto.getLocationId() != null) {
            observation.setLocation(new Location());
            observation.getLocation().setLocationId(updateObservationDto.getLocationId());
        }
        return observation;
    }

}

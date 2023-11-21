package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationSpeciesDto;
import edu.codespring.ro.biomap.dto.outgoing.SpeciesDto;
import edu.codespring.ro.biomap.model.Species;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class SpeciesMapper {

    public abstract SpeciesDto modelToDto(Species species);

    public abstract Species creationDtoToModel(CreationSpeciesDto speciesDto);

    public abstract List<SpeciesDto> modelsToDtos(List<Species> speciesList);

}

package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationLocationDto;
import edu.codespring.ro.biomap.dto.outgoing.LocationDto;
import edu.codespring.ro.biomap.model.Location;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class LocationMapper {

    public abstract LocationDto modelToDto(Location location);

    public abstract Location creationDtoToModel(CreationLocationDto locationDto);

    public abstract List<LocationDto> modelsToDtos(List<Location> locationList);
    
}

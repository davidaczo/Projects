package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationLocationDto;
import edu.codespring.ro.biomap.dto.outgoing.LocationDto;
import edu.codespring.ro.biomap.model.Country;
import edu.codespring.ro.biomap.model.Location;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-12T22:07:58+0300",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.1.1.jar, environment: Java 16.0.2 (Amazon.com Inc.)"
)
@Component
public class LocationMapperImpl extends LocationMapper {

    @Override
    public LocationDto modelToDto(Location location) {
        if ( location == null ) {
            return null;
        }

        Integer locationId = null;
        String locationName = null;
        Country country = null;
        Boolean active = null;

        locationId = location.getLocationId();
        locationName = location.getLocationName();
        country = location.getCountry();
        active = location.getActive();

        LocationDto locationDto = new LocationDto( locationId, locationName, country, active );

        return locationDto;
    }

    @Override
    public Location creationDtoToModel(CreationLocationDto locationDto) {
        if ( locationDto == null ) {
            return null;
        }

        Location location = new Location();

        location.setLocationName( locationDto.getLocationName() );
        location.setCountry( locationDto.getCountry() );
        location.setActive( locationDto.getActive() );

        return location;
    }

    @Override
    public List<LocationDto> modelsToDtos(List<Location> locationList) {
        if ( locationList == null ) {
            return null;
        }

        List<LocationDto> list = new ArrayList<LocationDto>( locationList.size() );
        for ( Location location : locationList ) {
            list.add( modelToDto( location ) );
        }

        return list;
    }
}

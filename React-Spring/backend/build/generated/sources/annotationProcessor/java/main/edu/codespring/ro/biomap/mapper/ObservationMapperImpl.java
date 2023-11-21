package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.UpdateObservationDto;
import edu.codespring.ro.biomap.dto.outgoing.ObservationDto;
import edu.codespring.ro.biomap.model.Developement;
import edu.codespring.ro.biomap.model.File;
import edu.codespring.ro.biomap.model.Observation;
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
public class ObservationMapperImpl extends ObservationMapper {

    @Override
    public ObservationDto modelToDto(Observation observation) {
        if ( observation == null ) {
            return null;
        }

        ObservationDto observationDto = new ObservationDto();

        observationDto.setObservationId( observation.getObservationId() );
        observationDto.setSpecies( observation.getSpecies() );
        observationDto.setUploader( observation.getUploader() );
        observationDto.setLocation( observation.getLocation() );
        List<File> list = observation.getFile();
        if ( list != null ) {
            observationDto.setFile( new ArrayList<File>( list ) );
        }
        observationDto.setDevelopment( observation.getDevelopment() );
        observationDto.setDate( observation.getDate() );
        observationDto.setTime( observation.getTime() );
        observationDto.setGeometry( observation.getGeometry() );
        observationDto.setStatus( observation.getStatus() );
        observationDto.setComment( observation.getComment() );
        observationDto.setNumber( observation.getNumber() );

        return observationDto;
    }

    @Override
    public List<ObservationDto> modelsToDtos(List<Observation> observations) {
        if ( observations == null ) {
            return null;
        }

        List<ObservationDto> list = new ArrayList<ObservationDto>( observations.size() );
        for ( Observation observation : observations ) {
            list.add( modelToDto( observation ) );
        }

        return list;
    }

    @Override
    public Observation updateDtoToModel(UpdateObservationDto observationDto, Observation observation) {
        if ( observationDto == null ) {
            return null;
        }

        if ( observationDto.getDevelopment() != null ) {
            observation.setDevelopment( Enum.valueOf( Developement.class, observationDto.getDevelopment() ) );
        }
        if ( observationDto.getStatus() != null ) {
            observation.setStatus( observationDto.getStatus() );
        }
        if ( observationDto.getComment() != null ) {
            observation.setComment( observationDto.getComment() );
        }
        if ( observationDto.getNumber() != null ) {
            observation.setNumber( observationDto.getNumber() );
        }

        return observation;
    }
}

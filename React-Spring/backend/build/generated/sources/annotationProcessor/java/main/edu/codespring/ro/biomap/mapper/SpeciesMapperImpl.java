package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationSpeciesDto;
import edu.codespring.ro.biomap.dto.outgoing.SpeciesDto;
import edu.codespring.ro.biomap.model.Species;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-18T10:54:09+0300",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.1.1.jar, environment: Java 16.0.2 (Amazon.com Inc.)"
)
@Component
public class SpeciesMapperImpl extends SpeciesMapper {

    @Override
    public SpeciesDto modelToDto(Species species) {
        if ( species == null ) {
            return null;
        }

        Integer speciesId = null;
        String nameLatin = null;
        String nameCommon = null;

        speciesId = species.getSpeciesId();
        nameLatin = species.getNameLatin();
        nameCommon = species.getNameCommon();

        SpeciesDto speciesDto = new SpeciesDto( speciesId, nameLatin, nameCommon );

        return speciesDto;
    }

    @Override
    public Species creationDtoToModel(CreationSpeciesDto speciesDto) {
        if ( speciesDto == null ) {
            return null;
        }

        Species species = new Species();

        species.setNameLatin( speciesDto.getNameLatin() );
        species.setNameCommon( speciesDto.getNameCommon() );

        return species;
    }

    @Override
    public List<SpeciesDto> modelsToDtos(List<Species> speciesList) {
        if ( speciesList == null ) {
            return null;
        }

        List<SpeciesDto> list = new ArrayList<SpeciesDto>( speciesList.size() );
        for ( Species species : speciesList ) {
            list.add( modelToDto( species ) );
        }

        return list;
    }
}

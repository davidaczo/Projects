package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationCountryDto;
import edu.codespring.ro.biomap.dto.outgoing.CountryDto;
import edu.codespring.ro.biomap.model.Country;
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
public class CountryMapperImpl extends CountryMapper {

    @Override
    public CountryDto modelToDto(Country country) {
        if ( country == null ) {
            return null;
        }

        Integer countryId = null;
        String countryName = null;

        countryId = country.getCountryId();
        countryName = country.getCountryName();

        CountryDto countryDto = new CountryDto( countryId, countryName );

        return countryDto;
    }

    @Override
    public Country creationDtoToModel(CreationCountryDto countryDto) {
        if ( countryDto == null ) {
            return null;
        }

        Country country = new Country();

        country.setCountryName( countryDto.getCountryName() );

        return country;
    }

    @Override
    public List<CountryDto> modelsToDtos(List<Country> countryList) {
        if ( countryList == null ) {
            return null;
        }

        List<CountryDto> list = new ArrayList<CountryDto>( countryList.size() );
        for ( Country country : countryList ) {
            list.add( modelToDto( country ) );
        }

        return list;
    }
}

package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationCountryDto;
import edu.codespring.ro.biomap.dto.outgoing.CountryDto;
import edu.codespring.ro.biomap.model.Country;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class CountryMapper {

    public abstract CountryDto modelToDto(Country country);

    public abstract Country creationDtoToModel(CreationCountryDto countryDto);

    public abstract List<CountryDto> modelsToDtos(List<Country> countryList);

}

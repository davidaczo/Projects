package edu.codespring.ro.biomap.dto.incoming;

import edu.codespring.ro.biomap.model.Country;
import lombok.Data;

@Data
public class CreationLocationDto {

    private String locationName;

    private Country country;

    private Boolean active;

}

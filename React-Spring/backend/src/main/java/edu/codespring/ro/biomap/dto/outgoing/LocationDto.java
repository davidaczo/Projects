package edu.codespring.ro.biomap.dto.outgoing;

import edu.codespring.ro.biomap.model.Country;
import lombok.Data;

@Data
public class LocationDto {
    private final Integer locationId;

    private final String locationName;

    private final Country country;

    private final Boolean active;

}
